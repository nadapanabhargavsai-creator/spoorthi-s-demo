export type AppStatus = "Submitted" | "Verified" | "Test Scheduled" | "Admission Confirmed" | "Completed";

export interface PlaySchoolApplication {
  id: string;
  studentName: string;
  dob: string;
  gender: string;
  program: string;
  branch: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  address: string;
  status: AppStatus;
  submittedAt: string;
}

export interface PlaySchoolPosition {
  id: string;
  title: string;
  type: "Full Time" | "Part Time";
  department: string;
  location: string;
  experience: string;
  description: string;
}

// ─── Mock Applications ────────────────────────────────────────────────────────
export const initialApplications: PlaySchoolApplication[] = [
  {
    id: "LBL-839201",
    studentName: "Reyansh Sharma",
    dob: "2022-04-12",
    gender: "Male",
    program: "Nursery",
    branch: "Papi Reddy Nagar (Head Branch)",
    fatherName: "Anil Sharma",
    motherName: "Priya Sharma",
    phone: "9876543210",
    email: "anil@example.com",
    address: "Road No. 4, Gachibowli, Hyderabad",
    status: "Admission Confirmed",
    submittedAt: "2026-06-15",
  },
  {
    id: "LBL-102938",
    studentName: "Aditi Reddy",
    dob: "2023-01-20",
    gender: "Female",
    program: "Play Group",
    branch: "Gachibowli Branch",
    fatherName: "Sandeep Reddy",
    motherName: "Kavitha Reddy",
    phone: "9381377301",
    email: "sandeep@example.com",
    address: "Papi Reddy Nagar, Hyderabad",
    status: "Verified",
    submittedAt: "2026-07-02",
  },
  {
    id: "LBL-447721",
    studentName: "Saanvi Rao",
    dob: "2021-09-05",
    gender: "Female",
    program: "LKG",
    branch: "Kukatpally Branch",
    fatherName: "Prakash Rao",
    motherName: "Suma Rao",
    phone: "9000011122",
    email: "prakash@example.com",
    address: "KPHB Colony, Hyderabad",
    status: "Submitted",
    submittedAt: "2026-07-15",
  },
];

// ─── Mock Open Positions ──────────────────────────────────────────────────────
export const initialPositions: PlaySchoolPosition[] = [
  {
    id: "job-1",
    title: "Preschool Lead Teacher",
    type: "Full Time",
    department: "Academic",
    location: "Papi Reddy Nagar",
    experience: "2+ Years in Montessori / Pre-Primary",
    description:
      "Design and implement child-centered educational play plans, coordinate with support staff, and manage parent communications.",
  },
  {
    id: "job-2",
    title: "Activity Coordinator",
    type: "Part Time",
    department: "Co-Curricular",
    location: "All Branches",
    experience: "1+ Year in Art / Music / Dance instruction",
    description:
      "Conduct daily creative arts, craft sessions, and coordinate annual day cultural practices for children aged 2–5.",
  },
  {
    id: "job-3",
    title: "Nursery Assistant Teacher",
    type: "Full Time",
    department: "Academic",
    location: "Gachibowli Branch",
    experience: "Freshers with NTT certification welcome",
    description:
      "Support lead teachers in daily lessons, manage classroom logistics, and monitor children's progress.",
  },
  {
    id: "job-4",
    title: "Admission Counsellor",
    type: "Full Time",
    department: "Admin",
    location: "Papi Reddy Nagar",
    experience: "1+ Year in counselling or education sales",
    description:
      "Handle parent inquiries, schedule school visits, process admission forms, and maintain the CRM tracker.",
  },
];
