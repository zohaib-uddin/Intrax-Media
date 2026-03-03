import express from "express";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = 3000;

// Supabase Client
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

app.use(cors());
app.use(express.json());

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

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
