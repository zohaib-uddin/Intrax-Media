export interface NavLink {
  name: string;
  path: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  path: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role?: string;
  image: string;
  content: string;
  rating: number;
}

export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  stats: string[];
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}