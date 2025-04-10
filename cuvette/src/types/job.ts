export interface Job {
  _id?: string;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  appliedDate: string; // ISO date string
  link?: string;
}
