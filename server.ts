import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = 3000;

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Excel File Path
const EXCEL_FILE_PATH = path.join(process.cwd(), "scheduled_meetings.xlsx");

// Helper to append to Excel
async function appendToExcel(data: any) {
  let workbook = new ExcelJS.Workbook();
  let worksheet;

  if (fs.existsSync(EXCEL_FILE_PATH)) {
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    worksheet = workbook.getWorksheet("Meetings");
  } else {
    worksheet = workbook.addWorksheet("Meetings");
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Full Name", key: "full_name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Guest Emails", key: "guest_emails", width: 30 },
      { header: "Business Name", key: "business_name", width: 25 },
      { header: "Service Interested", key: "service_interested", width: 25 },
      { header: "Monthly Revenue", key: "monthly_revenue", width: 20 },
      { header: "Project Budget", key: "project_budget", width: 20 },
      { header: "Website URL", key: "website_url", width: 30 },
      { header: "Target Audience", key: "target_audience", width: 25 },
      { header: "Timeline", key: "timeline", width: 20 },
      { header: "Additional Details", key: "additional_details", width: 40 },
      { header: "Existing Website", key: "existing_website", width: 15 },
      { header: "Meeting Date", key: "meeting_date", width: 15 },
      { header: "Meeting Time", key: "meeting_time", width: 15 },
      { header: "Timezone", key: "timezone", width: 20 },
      { header: "Meeting Link", key: "meeting_link", width: 40 },
      { header: "IP Address", key: "ip_address", width: 20 },
      { header: "Created At", key: "created_at", width: 25 },
    ];
    worksheet.getRow(1).font = { bold: true };
  }

  worksheet?.addRow(data);
  await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
}

// Calendly Webhook Endpoint
app.post("/api/webhooks/calendly", async (req, res) => {
  const event = req.body;

  // Verify event type
  if (event.event !== "invitee.created") {
    return res.status(200).send("Event ignored");
  }

  const payload = event.payload;
  const questions = payload.questions_and_answers || [];

  // Map custom questions
  const findAnswer = (q: string) => questions.find((item: any) => item.question.includes(q))?.answer || "";

  const meetingData = {
    full_name: payload.name,
    email: payload.email,
    guest_emails: payload.guests?.map((g: any) => g.email).join(", ") || "",
    business_name: findAnswer("business name"),
    service_interested: findAnswer("service are you interested in"),
    monthly_revenue: findAnswer("Monthly revenue"),
    project_budget: findAnswer("Project budget range"),
    website_url: findAnswer("Website URL"),
    target_audience: findAnswer("target audience"),
    timeline: findAnswer("Expected project timeline"),
    additional_details: findAnswer("additional details"),
    existing_website: findAnswer("existing website"),
    meeting_date: new Date(payload.scheduled_event.start_time).toLocaleDateString(),
    meeting_time: new Date(payload.scheduled_event.start_time).toLocaleTimeString(),
    timezone: payload.timezone,
    meeting_link: payload.scheduled_event.location?.join_url || "Check Email",
    ip_address: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    created_at: new Date().toISOString(),
  };

  try {
    // 1. Save to Supabase
    if (supabaseUrl && supabaseServiceKey) {
      const { error } = await supabase.from("scheduled_meetings").insert([meetingData]);
      if (error) console.error("Supabase Insert Error:", error);
    }

    // 2. Save to Excel
    await appendToExcel(meetingData);

    res.status(200).send("Webhook processed successfully");
  } catch (err) {
    console.error("Webhook Processing Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Contact Form Submission Endpoint
app.post("/api/contact", async (req, res) => {
  const contactData = {
    ...req.body,
    created_at: new Date().toISOString(),
  };

  try {
    if (supabaseUrl && supabaseServiceKey) {
      const { error } = await supabase.from("contact_submissions").insert([contactData]);
      if (error) {
        console.error("Supabase Insert Error (Contact):", error);
        return res.status(500).json({ error: "Failed to save message" });
      }
    }
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact Submission Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Database diagnostics endpoint
app.get("/api/db-diagnose", async (req, res) => {
  if (!dbUrl) {
    return res.json({
      configured: false,
      error: "No NEON_DATABASE_URL or DATABASE_URL environment variable is set."
    });
  }

  if (!dbPool) {
    return res.json({
      configured: true,
      poolInitialized: false,
      error: "Pool is not initialized. Check server startup logs."
    });
  }

  try {
    const start = Date.now();
    const result = await dbPool.query("SELECT NOW() as current_time, version();");
    const duration = Date.now() - start;

    return res.json({
      success: true,
      durationMs: duration,
      result: result.rows[0],
      connectionStringPrefix: dbUrl.substring(0, Math.min(30, dbUrl.length)) + "..."
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err.message || String(err),
      code: err.code,
      detail: err.detail,
      hint: err.hint,
      stack: err.stack,
      connectionStringPrefix: dbUrl.substring(0, Math.min(30, dbUrl.length)) + "..."
    });
  }
});

// Neon Database Setup (PostgreSQL) with local fallback
const dbUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
let dbPool: any = null;

if (dbUrl) {
  let finalDbUrl = dbUrl;
  if (!finalDbUrl.includes("localhost") && !finalDbUrl.includes("127.0.0.1") && !finalDbUrl.includes("sslmode=")) {
    finalDbUrl += finalDbUrl.includes("?") ? "&sslmode=verify-full" : "?sslmode=verify-full";
  }

  console.log("[Neon Database] Connection string found. Initializing Pool with 15s timeout...");
  dbPool = new Pool({
    connectionString: finalDbUrl,
    ssl: dbUrl.includes("localhost") || dbUrl.includes("127.0.0.1") ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000, // wait max 15 seconds for connection to handle serverless cold starts
    idleTimeoutMillis: 10000 // close idle clients after 10s
  });
} else {
  console.warn("[Neon Database] No NEON_DATABASE_URL or DATABASE_URL provided. Operating with local file storage fallback.");
}

// JSON Stores Setup (Fallback)
const COURSES_FILE_PATH = path.join(process.cwd(), "courses.json");
const USERS_FILE_PATH = path.join(process.cwd(), "users.json");

// Intrax Media Course Outlines - Seeding data
const initialCourses = [
  {
    "id": "course-1",
    "title": "UAE A to Z Dropshipping & Whitelabeling Mastery Program By Intrax Media",
    "overview": "Learn how to establish, brand, and scale a highly profitable whitelabel Shopify store in the UAE/GCC market from scratch.",
    "description": "This premium blueprint covers product sourcing from local suppliers, customs clearance, inventory branding, whitelabel strategy, and advanced GCC marketing campaigns. Ideal for beginners and intermediate sellers who want to achieve 10k+ AED monthly profits.",
    "image": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    "videos": [
      {
        "title": "Module 1: GCC & UAE Market Fundamentals",
        "videoLink": "https://www.loom.com/embed/f84bf8e5c4a548238712fa9b47e5b128",
        "description": "Introduction to UAE dropshipping ecosystem, license requirements, and COD (Cash on Delivery) mechanics."
      },
      {
        "title": "Module 2: High-Margin Sourcing & Whitelabeling in UAE",
        "videoLink": "https://www.loom.com/embed/f84bf8e5c4a548238712fa9b47e5b128",
        "description": "How to source hot winning products locally via warehouses in Dubai and negotiate bulk pricing for whitelabel branding."
      },
      {
        "title": "Module 3: Premium Shopify Checkout Optimization",
        "videoLink": "https://www.loom.com/embed/f84bf8e5c4a548238712fa9b47e5b128",
        "description": "Step-by-step custom layout configuration, single-page order form setup, and conversion rate optimizations."
      }
    ]
  },
  {
    "id": "course-2",
    "title": "TikTok Ads Mastery 2025 | Beginner to Expert",
    "overview": "Master the world's most engaging ad network to generate immediate impulse sales and build sustained brand awareness.",
    "description": "Step-by-step masterclass on launching viral TikTok campaigns, scaling budgets safely, custom pixel integration, Spark Ads, and building highly persuasive AI UGC ads that convert cold audience traffic instantly.",
    "image": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    "videos": [
      {
        "title": "Module 1: Custom TikTok Pixel Hook & Setup",
        "videoLink": "https://www.loom.com/embed/f84bf8e5c4a548238712fa9b47e5b128",
        "description": "Unlocking deep optimization telemetry, event tracking, and resolving standard attribution problems."
      },
      {
        "title": "Module 2: Seducing Audiences on TikTok and Bidding Strategy",
        "videoLink": "https://www.loom.com/embed/f84bf8e5c4a548238712fa9b47e5b128",
        "description": "How to design custom audiences, utilize broad scale bidding patterns, and structure ABO/CBO campaigns."
      },
      {
        "title": "Module 3: Creator Marketplace & AI UGC Creative Strategy",
        "videoLink": "https://www.loom.com/embed/f84bf8e5c4a548238712fa9b47e5b128",
        "description": "Creating viral hooks, scriptwriting blueprints for ecom brands, and scripting high CTR product testimonials."
      }
    ]
  }
];

// Bootstrap database tables
async function bootstrapDatabase() {
  if (!dbPool) return;
  try {
    console.log("[Neon Database] Checking and bootstrapping tables...");
    
    // Create users table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        first_name VARCHAR(255),
        last_name VARCHAR(255)
      )
    `);

    // Ensure first_name and last_name exist if table already existed
    try {
      await dbPool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(255)");
      await dbPool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(255)");
    } catch (e) {
      console.log("[Neon Database] Columns first_name and last_name might already exist or auto-created.");
    }

    // Create courses table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        overview TEXT NOT NULL,
        description TEXT,
        image TEXT,
        videos JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure course columns exist if table already existed
    try {
      await dbPool.query("ALTER TABLE courses ADD COLUMN IF NOT EXISTS description TEXT");
      await dbPool.query("ALTER TABLE courses ADD COLUMN IF NOT EXISTS image TEXT");
      await dbPool.query("ALTER TABLE courses ADD COLUMN IF NOT EXISTS videos JSONB DEFAULT '[]'::jsonb");
      await dbPool.query("ALTER TABLE courses ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP");
    } catch (e) {
      console.log("[Neon Database] Columns for courses table might already exist or auto-created.");
    }

    // Seed courses if empty
    const checkRes = await dbPool.query("SELECT COUNT(*) FROM courses");
    const count = parseInt(checkRes.rows[0].count);
    if (count === 0) {
      console.log("[Neon Database] Seeding initial courses...");
      for (const course of initialCourses) {
        await dbPool.query(
          "INSERT INTO courses (id, title, overview, description, image, videos) VALUES ($1, $2, $3, $4, $5, $6)",
          [course.id, course.title, course.overview, course.description, course.image, JSON.stringify(course.videos)]
        );
      }
      console.log("[Neon Database] Successfully seeded initial courses.");
    }

    // Sync existing local users from users.json to the database on startup
    if (fs.existsSync(USERS_FILE_PATH)) {
      try {
        const localUsers = JSON.parse(fs.readFileSync(USERS_FILE_PATH, "utf8"));
        console.log(`[Neon Database] Auto-syncing ${localUsers.length} existing users from local store to database...`);
        for (const user of localUsers) {
          const emailLower = user.email.toLowerCase().trim();
          const isAdmin = emailLower === "intraxmedia@gmail.com" || emailLower === "intraxmedia.team@gmail.com";
          const finalRole = user.role || (isAdmin ? "admin" : "user");
          const fName = user.first_name || "";
          const lName = user.last_name || "";
          
          await dbPool.query(
            `INSERT INTO users (id, name, email, role, first_name, last_name)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (email) 
             DO UPDATE SET 
               id = EXCLUDED.id,
               name = CASE 
                 WHEN users.name IS NULL OR users.name = 'User' OR users.name = '' OR users.name LIKE '%@%' THEN EXCLUDED.name
                 ELSE users.name 
               END,
               role = EXCLUDED.role,
               first_name = CASE
                 WHEN users.first_name IS NULL OR users.first_name = '' THEN EXCLUDED.first_name
                 ELSE users.first_name
               END,
               last_name = CASE
                 WHEN users.last_name IS NULL OR users.last_name = '' THEN EXCLUDED.last_name
                 ELSE users.last_name
               END`,
            [user.id, user.name, emailLower, finalRole, fName, lName]
          );
        }
        console.log("[Neon Database] Auto-syncing of existing users complete.");
      } catch (syncErr) {
        console.error("[Neon Database] Startup local users sync failed:", syncErr);
      }
    }
  } catch (err) {
    console.error("[Neon Database] Bootstrapping failed:", err);
  }
}

// Bootstrap Neon DB on startup
bootstrapDatabase();

// Seed initial files if they do not exist (local fallback)
if (!fs.existsSync(COURSES_FILE_PATH)) {
  fs.writeFileSync(COURSES_FILE_PATH, JSON.stringify(initialCourses, null, 2), "utf8");
}
if (!fs.existsSync(USERS_FILE_PATH)) {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify([], null, 2), "utf8");
}

// Helpers
function getCoursesData() {
  try {
    return JSON.parse(fs.readFileSync(COURSES_FILE_PATH, "utf8"));
  } catch (e) {
    return initialCourses;
  }
}

function saveCoursesData(courses: any) {
  fs.writeFileSync(COURSES_FILE_PATH, JSON.stringify(courses, null, 2), "utf8");
}

function getUsersData() {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE_PATH, "utf8"));
  } catch (e) {
    return [];
  }
}

function saveUsersData(users: any) {
  fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf8");
}

// Auth APIs
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, firstName, lastName } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const emailLower = email.toLowerCase().trim();

  if (emailLower === "intraxmedia@gmail.com") {
    return res.status(400).json({ error: "Email already registered" });
  }

  const fName = firstName || "";
  const lName = lastName || "";
  const fullName = name || `${fName} ${lName}`.trim() || emailLower.split('@')[0];

  const id = "user-" + Math.random().toString(36).substr(2, 9);
  const newUser = {
    id,
    name: fullName,
    email: emailLower,
    password,
    role: "user",
    first_name: fName,
    last_name: lName
  };

  if (dbPool) {
    try {
      const check = await dbPool.query("SELECT * FROM users WHERE email = $1", [emailLower]);
      if (check.rows.length > 0) {
        return res.status(400).json({ error: "Email already registered" });
      }

      await dbPool.query(
        "INSERT INTO users (id, name, email, password, role, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [id, fullName, emailLower, password, "user", fName, lName]
      );

      return res.status(200).json({
        message: "Registration successful!",
        user: { id, name: fullName, email: emailLower, role: "user", first_name: fName, last_name: lName }
      });
    } catch (err) {
      console.error("[Neon Database] Signup Error:", err);
    }
  }

  const users = getUsersData();
  if (users.some((u: any) => u.email === emailLower)) {
    return res.status(400).json({ error: "Email already registered" });
  }

  users.push(newUser);
  saveUsersData(users);

  res.status(200).json({
    message: "Registration successful!",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      first_name: newUser.first_name,
      last_name: newUser.last_name
    }
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const emailLower = email.toLowerCase().trim();

  // Admin credentials verification as specified in guidelines
  const isAdminCredentials = 
    (emailLower === "intraxmedia@gmail.com" && 
      (password === "intraxmedia@intraxmedia123456" || 
       password === "@intraxmedia123456" || 
       password === "intramedia@intramedia123456")) ||
    (emailLower === "intraxmedia.team@gmail.com" && 
      (password === "@intraxmediateam12345" || 
       password === "@intraxmedia.team12345" ||
       password === "intraxmedia.team12345" ||
       password === "@intraxmediateam123456" ||
       password === "@intraxmedia.team123456"));

  if (isAdminCredentials) {
    const adminUser = {
      id: "admin-id-" + (emailLower === "intraxmedia.team@gmail.com" ? "team" : "main"),
      name: emailLower === "intraxmedia.team@gmail.com" ? "Intrax Media Team Admin" : "Intrax Media Admin",
      email: emailLower,
      role: "admin"
    };

    if (dbPool) {
      try {
        await dbPool.query(
          `INSERT INTO users (id, name, email, password, role) 
           VALUES ($1, $2, $3, $4, $5) 
           ON CONFLICT (email) DO UPDATE SET role = 'admin' 
           RETURNING *`,
          [adminUser.id, adminUser.name, adminUser.email, password, "admin"]
        );
      } catch (err) {
        console.error("[Neon Database] Admin Login Write Error:", err);
      }
    }

    return res.json({
      message: "Admin login successful",
      user: adminUser
    });
  }

  if (dbPool) {
    try {
      const check = await dbPool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [emailLower, password]);
      if (check.rows.length > 0) {
        const found = check.rows[0];
        return res.json({
          message: "Login successful",
          user: {
            id: found.id,
            name: found.name,
            email: found.email,
            role: found.role || "user"
          }
        });
      } else {
        return res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (err) {
      console.error("[Neon Database] Login Error:", err);
    }
  }

  // Regular user verification fallback
  const users = getUsersData();
  const foundUser = users.find((u: any) => u.email === emailLower && u.password === password);

  if (!foundUser) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  res.json({
    message: "Login successful",
    user: {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: "user"
    }
  });
});

// Clerk Auth sync endpoint
app.post("/api/auth/sync-clerk", async (req, res) => {
  const { id, name, email, firstName, lastName } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required to sync" });
  }

  const emailLower = email.toLowerCase().trim();
  const isAdmin = emailLower === "intraxmedia@gmail.com" || emailLower === "intraxmedia.team@gmail.com" || emailLower === "intraxmediateam@gmail.com";
  const finalRole = isAdmin ? "admin" : "user";

  const fName = firstName || "";
  const lName = lastName || "";
  const fullName = name || `${fName} ${lName}`.trim() || emailLower.split('@')[0];

  let userObjFinal = {
    id: id || "clerk-" + Math.random().toString(36).substr(2, 9),
    name: fullName,
    email: emailLower,
    role: finalRole,
    first_name: fName,
    last_name: lName
  };

  if (dbPool) {
    try {
      // 1. Check if user already exists by email
      const checkEmail = await dbPool.query("SELECT * FROM users WHERE email = $1", [emailLower]);
      let qRes;
      
      if (checkEmail.rows.length > 0) {
        // Update user details by email, preserving admin role
        console.log(`[Neon Database] Sync: User exists by email ${emailLower}. Updating...`);
        qRes = await dbPool.query(
          `UPDATE users SET 
             id = $1, 
             name = CASE 
               WHEN name IS NULL OR name = 'User' OR name = '' OR name LIKE '%@%' THEN $2 
               ELSE name 
             END,
             role = CASE WHEN role = 'admin' THEN 'admin' ELSE $3 END,
             first_name = CASE 
               WHEN first_name IS NULL OR first_name = '' THEN $4 
               ELSE first_name 
             END,
             last_name = CASE 
               WHEN last_name IS NULL OR last_name = '' THEN $5 
               ELSE last_name 
             END
           WHERE email = $6 RETURNING *`,
          [userObjFinal.id, userObjFinal.name, userObjFinal.role, userObjFinal.first_name, userObjFinal.last_name, emailLower]
        );
      } else {
        // 2. Check if user already exists by id
        const checkId = await dbPool.query("SELECT * FROM users WHERE id = $1", [userObjFinal.id]);
        if (checkId.rows.length > 0) {
          // Update details by id, preserving admin role
          console.log(`[Neon Database] Sync: User exists by id ${userObjFinal.id}. Updating email and details...`);
          qRes = await dbPool.query(
            `UPDATE users SET 
               name = CASE 
                 WHEN name IS NULL OR name = 'User' OR name = '' OR name LIKE '%@%' THEN $1 
                 ELSE name 
               END,
               email = $2,
               role = CASE WHEN role = 'admin' THEN 'admin' ELSE $3 END,
               first_name = CASE 
                 WHEN first_name IS NULL OR first_name = '' THEN $4 
                 ELSE first_name 
               END,
               last_name = CASE 
                 WHEN last_name IS NULL OR last_name = '' THEN $5 
                 ELSE last_name 
               END
             WHERE id = $6 RETURNING *`,
            [userObjFinal.name, emailLower, userObjFinal.role, userObjFinal.first_name, userObjFinal.last_name, userObjFinal.id]
          );
        } else {
          // 3. Completely new user! Just insert
          console.log(`[Neon Database] Sync: Registering totally new user ${emailLower} (${userObjFinal.id}).`);
          qRes = await dbPool.query(
            `INSERT INTO users (id, name, email, role, first_name, last_name)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [userObjFinal.id, userObjFinal.name, emailLower, userObjFinal.role, userObjFinal.first_name, userObjFinal.last_name]
          );
        }
      }

      if (qRes && qRes.rows.length > 0) {
        userObjFinal.name = qRes.rows[0].name;
        userObjFinal.id = qRes.rows[0].id;
        userObjFinal.role = qRes.rows[0].role;
        userObjFinal.first_name = qRes.rows[0].first_name || fName;
        userObjFinal.last_name = qRes.rows[0].last_name || lName;
        console.log(`[Neon Database] Sync complete for user: ${emailLower} with role: ${userObjFinal.role}`);
      }
    } catch (err: any) {
      console.error("[Neon Database] Instant Clerk sync-clerk single-roundtrip Error:", err);
      return res.status(500).json({ error: "Sync to database failed", details: err.message || String(err) });
    }
  }

  const users = getUsersData();
  const existingIndex = users.findIndex((u: any) => u.email === emailLower);
  if (existingIndex !== -1) {
    const existing = users[existingIndex];
    const isIncomingFallback = !fullName || fullName === "User" || fullName.toLowerCase() === emailLower.split('@')[0].toLowerCase();
    const hasExistingRealName = existing.name && existing.name !== "User" && !existing.name.includes('@');
    
    const finalName = (hasExistingRealName && isIncomingFallback) ? existing.name : fullName;
    const finalFirstName = existing.first_name || fName;
    const finalLastName = existing.last_name || lName;

    users[existingIndex] = { 
      ...existing, 
      id: userObjFinal.id,
      name: finalName, 
      role: finalRole,
      first_name: finalFirstName,
      last_name: finalLastName
    };
    userObjFinal.name = finalName;
    userObjFinal.first_name = finalFirstName;
    userObjFinal.last_name = finalLastName;
  } else {
    users.push(userObjFinal);
  }
  saveUsersData(users);

  res.json({
    message: "Clerk sync successful",
    user: userObjFinal
  });
});

// Helper to verify if the requester has admin role in Neon DB users table
async function verifyAdminRole(req: express.Request): Promise<boolean> {
  const userId = req.headers['x-user-id'] as string;
  if (!userId) {
    console.warn("[Admin Verification] Denied: Missing x-user-id header.");
    return false;
  }
  
  if (dbPool) {
    try {
      const qRes = await dbPool.query("SELECT role FROM users WHERE id = $1", [userId]);
      if (qRes.rows.length > 0) {
        const userRole = qRes.rows[0].role;
        console.log(`[Admin Verification] User ${userId} has role '${userRole}' in Neon DB.`);
        return userRole === 'admin';
      } else {
        console.warn(`[Admin Verification] Denied: User ${userId} not found in Neon DB.`);
        return false;
      }
    } catch (err) {
      console.error("[Admin Verification] Database error querying user role:", err);
      return false;
    }
  } else {
    // Local fallback: Check x-user-role header as secondary fallback for pure local storage testing
    const userRoleHeader = req.headers['x-user-role'] as string;
    console.warn("[Admin Verification] dbPool inactive. Falling back to frontend role header check:", userRoleHeader);
    return userRoleHeader === 'admin';
  }
}

// Courses Management APIs
app.get("/api/courses", async (req, res) => {
  if (dbPool) {
    try {
      const dbRes = await dbPool.query("SELECT * FROM courses ORDER BY created_at ASC");
      const mapped = dbRes.rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        overview: row.overview,
        description: row.description || "",
        image: row.image || "",
        videos: typeof row.videos === 'string' ? JSON.parse(row.videos) : row.videos
      }));
      return res.json(mapped);
    } catch (err) {
      console.error("[Neon Database] Courses Fetch Error:", err);
    }
  }
  const courses = getCoursesData();
  res.json(courses);
});

app.post("/api/courses", async (req, res) => {
  const isAdmin = await verifyAdminRole(req);
  if (!isAdmin) {
    return res.status(403).json({ error: "Access denied. Only administrators are allowed to create courses." });
  }

  const { title, overview, description, image, videos } = req.body;
  if (!title || !overview) {
    return res.status(400).json({ error: "Title and Overview are standard and required." });
  }

  const id = "course-" + Math.random().toString(36).substr(2, 9);
  const newCourse = {
    id,
    title,
    overview,
    description: description || "",
    image: image || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    videos: videos || []
  };

  // 1. Save to local fallback cache
  const courses = getCoursesData();
  courses.push(newCourse);
  saveCoursesData(courses);

  // 2. Save to Neon Database if active
  if (dbPool) {
    try {
      await dbPool.query(
        "INSERT INTO courses (id, title, overview, description, image, videos) VALUES ($1, $2, $3, $4, $5, $6)",
        [id, title, overview, description || "", image || "", JSON.stringify(videos || [])]
      );
    } catch (err: any) {
      console.error("[Neon Database] Courses Add Error:", err);
      return res.status(500).json({ error: "Database execution failed to create course", details: err.message || String(err) });
    }
  }

  res.status(201).json(newCourse);
});

// Add video/lecture to a specific course
app.post("/api/courses/:id/add-video", async (req, res) => {
  const isAdmin = await verifyAdminRole(req);
  if (!isAdmin) {
    return res.status(403).json({ error: "Access denied. Only administrators are allowed to add lectures." });
  }

  const { id } = req.params;
  const { title, videoLink, description } = req.body;

  if (!title || !videoLink) {
    return res.status(400).json({ error: "Video Title and Loom Link are required." });
  }

  let finalVideos: any[] = [];
  let updatedCourse;

  // 1. Update local cache first to ensure syncing
  const courses = getCoursesData();
  const index = courses.findIndex((c: any) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Course not found" });
  }

  courses[index].videos = courses[index].videos || [];
  courses[index].videos.push({ title, videoLink, description: description || "" });
  saveCoursesData(courses);
  finalVideos = courses[index].videos;
  updatedCourse = courses[index];

  // 2. Update Neon Database if active
  if (dbPool) {
    try {
      const check = await dbPool.query("SELECT * FROM courses WHERE id = $1", [id]);
      if (check.rows.length === 0) {
        return res.status(404).json({ error: "Course not found in Database" });
      }
      const existing = check.rows[0];
      const videos = typeof existing.videos === 'string' ? JSON.parse(existing.videos) : (existing.videos || []);
      
      videos.push({ title, videoLink, description: description || "" });

      const updateRes = await dbPool.query(
        "UPDATE courses SET videos = $1 WHERE id = $2 RETURNING *",
        [JSON.stringify(videos), id]
      );

      const row = updateRes.rows[0];
      updatedCourse = {
        id: row.id,
        title: row.title,
        overview: row.overview,
        description: row.description || "",
        image: row.image || "",
        videos: typeof row.videos === 'string' ? JSON.parse(row.videos) : row.videos
      };
    } catch (err: any) {
      console.error("[Neon Database] Courses Video Add Error:", err);
      return res.status(500).json({ error: "Database execution failed to append video", details: err.message || String(err) });
    }
  }

  res.json(updatedCourse);
});

app.put("/api/courses/:id", async (req, res) => {
  const isAdmin = await verifyAdminRole(req);
  if (!isAdmin) {
    return res.status(403).json({ error: "Access denied. Only administrators are allowed to edit courses." });
  }

  const { id } = req.params;
  const { title, overview, description, image, videos } = req.body;

  let updatedCourseResult;

  // 1. Update local cache
  const courses = getCoursesData();
  const index = courses.findIndex((c: any) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Course not found" });
  }

  courses[index] = {
    ...courses[index],
    title: title || courses[index].title,
    overview: overview || courses[index].overview,
    description: description !== undefined ? description : courses[index].description,
    image: image || courses[index].image,
    videos: videos || courses[index].videos
  };

  saveCoursesData(courses);
  updatedCourseResult = courses[index];

  // 2. Update Neon Database if active
  if (dbPool) {
    try {
      const check = await dbPool.query("SELECT * FROM courses WHERE id = $1", [id]);
      if (check.rows.length === 0) {
        return res.status(404).json({ error: "Course not found in Database" });
      }
      const existing = check.rows[0];
      const updatedTitle = title || existing.title;
      const updatedOverview = overview || existing.overview;
      const updatedDescription = description !== undefined ? description : (existing.description || "");
      const updatedImage = image || existing.image;
      const updatedVideos = videos || (typeof existing.videos === 'string' ? JSON.parse(existing.videos) : existing.videos);

      await dbPool.query(
        "UPDATE courses SET title = $1, overview = $2, description = $3, image = $4, videos = $5 WHERE id = $6",
        [updatedTitle, updatedOverview, updatedDescription, updatedImage, JSON.stringify(updatedVideos), id]
      );

      updatedCourseResult = {
        id,
        title: updatedTitle,
        overview: updatedOverview,
        description: updatedDescription,
        image: updatedImage,
        videos: updatedVideos
      };
    } catch (err: any) {
      console.error("[Neon Database] Courses Edit Error:", err);
      return res.status(500).json({ error: "Database execution failed to update course", details: err.message || String(err) });
    }
  }

  res.json(updatedCourseResult);
});

app.delete("/api/courses/:id", async (req, res) => {
  const isAdmin = await verifyAdminRole(req);
  if (!isAdmin) {
    return res.status(403).json({ error: "Access denied. Only administrators are allowed to delete courses." });
  }

  const { id } = req.params;

  // 1. Delete from local cache
  const courses = getCoursesData();
  const filtered = courses.filter((c: any) => c.id !== id);

  if (courses.length === filtered.length) {
    return res.status(404).json({ error: "Course not found" });
  }

  saveCoursesData(filtered);

  // 2. Delete from Neon Database if active
  if (dbPool) {
    try {
      const resDb = await dbPool.query("DELETE FROM courses WHERE id = $1", [id]);
      if (resDb.rowCount === 0) {
        return res.status(404).json({ error: "Course not found in Database" });
      }
    } catch (err: any) {
      console.error("[Neon Database] Courses Delete Error:", err);
      return res.status(500).json({ error: "Database execution failed to delete course", details: err.message || String(err) });
    }
  }

  res.json({ message: "Course deleted completely." });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    let distPath = path.join(process.cwd(), 'dist');
    // Check if dist folder doesn't have index.html, but current working directory has it (e.g. flattened public_html)
    if (!fs.existsSync(path.join(distPath, 'index.html')) && fs.existsSync(path.join(process.cwd(), 'index.html'))) {
      distPath = process.cwd();
    }
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
