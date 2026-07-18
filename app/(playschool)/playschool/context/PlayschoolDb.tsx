"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface StudentDetails {
  fullName: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  aadhaarNum: string;
  photo?: string;
  birthCert?: string;
  aadhaarDoc?: string;
  otherDoc?: string;
}

export interface ParentDetails {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  phone: string;
  email: string;
}

export interface AddressDetails {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface AcademicDetails {
  program: string; // Play Group, Nursery, LKG, UKG
  prevSchool: string;
}

export interface AdmissionApplication {
  id: string;
  student: StudentDetails;
  parent: ParentDetails;
  address: AddressDetails;
  academic: AcademicDetails;
  medicalInfo: string;
  emergencyContact: string;
  status: "Pending" | "In Review" | "Approved" | "Rejected";
  submittedAt: string;
  feePaid: boolean;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "General" | "Activity" | "Holiday" | "Urgent";
}

export interface Homework {
  id: string;
  class: "Play Group" | "Nursery" | "LKG" | "UKG";
  subject: string;
  content: string;
  dueDate: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "Unread" | "Read";
}

export interface CareerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeName: string;
  message: string;
  date: string;
}

export interface ChildProfile {
  name: string;
  rollNo: string;
  grade: "Play Group" | "Nursery" | "LKG" | "UKG";
  attendance: string;
  homework: string;
  feeStatus: "Paid" | "Pending" | "Due";
  dueAmount: number;
  notice: string;
  cameraUrl: string;
  cameraName: string;
}

export interface UserSession {
  username: string;
  role: "parent" | "admin";
  childProfile?: ChildProfile;
  token: string;
}

export interface CameraSettings {
  enabled: boolean;
  restrictHours: boolean;
  startTime: string; // "HH:MM" e.g., "09:00"
  endTime: string;   // "HH:MM" e.g., "13:00"
}

interface PlayschoolDbValues {
  applications: AdmissionApplication[];
  notices: Notice[];
  homeworks: Homework[];
  contacts: ContactMessage[];
  careers: CareerApplication[];
  subscribers: string[];
  cameraSettings: CameraSettings;
  session: UserSession | null;
  
  // Auth Functions
  login: (username: string, password: string) => { success: boolean; error?: string; session?: UserSession };
  logout: () => void;
  
  // Application Actions
  submitApplication: (appData: Omit<AdmissionApplication, "id" | "status" | "submittedAt" | "feePaid">) => string;
  updateApplicationStatus: (id: string, status: AdmissionApplication["status"]) => void;
  toggleApplicationFee: (id: string) => void;
  deleteApplication: (id: string) => void;
  
  // Camera Actions
  updateCameraSettings: (settings: Partial<CameraSettings>) => void;
  isCameraAccessible: (cameraName: string) => { accessible: boolean; reason?: string };
  
  // Notice Actions
  addNotice: (title: string, content: string, category: Notice["category"]) => void;
  deleteNotice: (id: string) => void;
  
  // Homework Actions
  addHomework: (grade: Homework["class"], subject: string, content: string, dueDate: string) => void;
  deleteHomework: (id: string) => void;
  
  // Form Submissions
  submitContactForm: (name: string, email: string, phone: string, subject: string, message: string) => void;
  submitCareerForm: (fullName: string, email: string, phone: string, position: string, experience: string, resumeName: string, message: string) => void;
  subscribeNewsletter: (email: string) => { success: boolean; message: string };
  markContactRead: (id: string) => void;
}

const PlayschoolDbContext = createContext<PlayschoolDbValues | undefined>(undefined);

// Static Seed Data
const defaultNotices: Notice[] = [
  { id: "n1", title: "Monsoon Health Advisory", content: "Parents are requested to send raincoats and a spare set of clothes labeled in their child's bag during rainy days. Make sure water bottles are cleaned daily.", date: "2026-07-18", category: "Urgent" },
  { id: "n2", title: "Field Trip to Nehru Zoological Park", content: "We are organizing our annual nature field trip for LKG & UKG students on next Friday. Consent forms and detailed itineraries have been sent in student diaries. Please submit sign-offs by Wednesday.", date: "2026-07-15", category: "Activity" },
  { id: "n3", title: "Independence Day Celebrations", content: "Little Blossoms will celebrate Independence Day on 15th August. Children are requested to wear traditional tri-color attire. Performance details will be shared by class teachers.", date: "2026-07-10", category: "General" }
];

const defaultHomeworks: Homework[] = [
  { id: "h1", class: "Play Group", subject: "Sensory", content: "Color the sunflower with yellow finger paint. Focus on boundaries.", dueDate: "2026-07-21" },
  { id: "h2", class: "Nursery", subject: "English", content: "Trace letter 'C' in worksheets Page 12-13. Color the cup.", dueDate: "2026-07-20" },
  { id: "h3", class: "LKG", subject: "Math", content: "Write numbers 1 to 20 in squares checkbook. Solve the pattern sheets.", dueDate: "2026-07-20" },
  { id: "h4", class: "UKG", subject: "Science", content: "Identify and paste pictures of 5 domestic animals and 5 wild animals in scrap book.", dueDate: "2026-07-22" }
];

const childProfiles: Record<string, ChildProfile> = {
  srinivas: {
    name: "Aarav Srinivas",
    rollNo: "LB-102",
    grade: "Play Group",
    attendance: "92%",
    homework: "Finger paint activity inside the bubble worksheet.",
    feeStatus: "Paid",
    dueAmount: 0,
    notice: "Bring a seed or small plant in a pot for Gardening Day on Tuesday.",
    cameraUrl: "playschool-group-cctv",
    cameraName: "Play Group Room"
  },
  anitha: {
    name: "Saanvi Reddy",
    rollNo: "LB-205",
    grade: "Nursery",
    attendance: "96%",
    homework: "Practice tracing letters A, B, C on sand tray or pencil workbook page 14.",
    feeStatus: "Due",
    dueAmount: 12000,
    notice: "Soft Toys Exhibition this Friday. Bring your child's favorite plush toy.",
    cameraUrl: "playschool-nursery-cctv",
    cameraName: "Nursery Room"
  },
  rahul: {
    name: "Kabir Sharma",
    rollNo: "LB-312",
    grade: "LKG",
    attendance: "89%",
    homework: "Trace & practice numbers 1 to 15. Complete oral recitation of phonics sound 'A' to 'G'.",
    feeStatus: "Paid",
    dueAmount: 0,
    notice: "Clay Modelling kits will be provided at school tomorrow.",
    cameraUrl: "playschool-lkg-cctv",
    cameraName: "LKG Classroom"
  },
  priya: {
    name: "Riya Sen",
    rollNo: "LB-404",
    grade: "UKG",
    attendance: "95%",
    homework: "Solve simple 1-digit addition worksheets. Read Chapter 2 of Short Stories (The Fox and the Grapes).",
    feeStatus: "Due",
    dueAmount: 15500,
    notice: "Graduation gown measurements will be taken on Thursday.",
    cameraUrl: "playschool-ukg-cctv",
    cameraName: "UKG Classroom"
  }
};

export const PlayschoolDbProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [careers, setCareers] = useState<CareerApplication[]>([]);
  const [subscribers, setSubscribers] = useState<string[]>([]);
  const [cameraSettings, setCameraSettings] = useState<CameraSettings>({
    enabled: true,
    restrictHours: true,
    startTime: "09:00",
    endTime: "13:00"
  });
  const [session, setSession] = useState<UserSession | null>(null);

  // Load database from localStorage on mount
  useEffect(() => {
    // 1. Applications
    const savedApps = localStorage.getItem("lb_applications");
    if (savedApps) {
      setApplications(JSON.parse(savedApps));
    } else {
      const initialApps: AdmissionApplication[] = [
        {
          id: "LB-ADM-581903",
          student: { fullName: "Reyansh Goel", dob: "2023-04-12", gender: "Male", bloodGroup: "O+", aadhaarNum: "482019283749" },
          parent: { fatherName: "Alok Goel", fatherOccupation: "Software Engineer", motherName: "Neha Goel", motherOccupation: "Architect", phone: "9876543210", email: "alok@example.com" },
          address: { street: "Road No 4, Jubilee Hills", city: "Hyderabad", state: "Telangana", pincode: "500033" },
          academic: { program: "Nursery", prevSchool: "None" },
          medicalInfo: "No known allergies.",
          emergencyContact: "9876543210 (Alok)",
          status: "Approved",
          submittedAt: "2026-07-10T10:30:00Z",
          feePaid: true
        },
        {
          id: "LB-ADM-927318",
          student: { fullName: "Aanya Verma", dob: "2022-09-22", gender: "Female", bloodGroup: "A+", aadhaarNum: "937402847291" },
          parent: { fatherName: "Vikas Verma", fatherOccupation: "Chartered Accountant", motherName: "Rani Verma", motherOccupation: "Homemaker", phone: "9123456789", email: "vikas@example.com" },
          address: { street: "Green Meadows, Gachibowli", city: "Hyderabad", state: "Telangana", pincode: "500032" },
          academic: { program: "LKG", prevSchool: "Happy Kidz Nursery" },
          medicalInfo: "Mild asthma. Inhaler kept in school bag.",
          emergencyContact: "9123456789 (Vikas)",
          status: "Pending",
          submittedAt: "2026-07-17T15:45:00Z",
          feePaid: false
        }
      ];
      setApplications(initialApps);
      localStorage.setItem("lb_applications", JSON.stringify(initialApps));
    }

    // 2. Notices
    const savedNotices = localStorage.getItem("lb_notices");
    if (savedNotices) {
      setNotices(JSON.parse(savedNotices));
    } else {
      setNotices(defaultNotices);
      localStorage.setItem("lb_notices", JSON.stringify(defaultNotices));
    }

    // 3. Homeworks
    const savedHomeworks = localStorage.getItem("lb_homeworks");
    if (savedHomeworks) {
      setHomeworks(JSON.parse(savedHomeworks));
    } else {
      setHomeworks(defaultHomeworks);
      localStorage.setItem("lb_homeworks", JSON.stringify(defaultHomeworks));
    }

    // 4. Contacts
    const savedContacts = localStorage.getItem("lb_contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      const initialContacts: ContactMessage[] = [
        { id: "c1", name: "Sunitha Rao", email: "sunitha@example.com", phone: "8989898989", subject: "Fee structure inquiry", message: "Hi, I wanted to understand the fee structure and installments for LKG admissions. Thanks.", date: "2026-07-18", status: "Unread" }
      ];
      setContacts(initialContacts);
      localStorage.setItem("lb_contacts", JSON.stringify(initialContacts));
    }

    // 5. Careers
    const savedCareers = localStorage.getItem("lb_careers");
    if (savedCareers) {
      setCareers(JSON.parse(savedCareers));
    }

    // 6. Subscribers
    const savedSubscribers = localStorage.getItem("lb_subscribers");
    if (savedSubscribers) {
      setSubscribers(JSON.parse(savedSubscribers));
    }

    // 7. Camera Settings
    const savedCamSettings = localStorage.getItem("lb_camera_settings");
    if (savedCamSettings) {
      setCameraSettings(JSON.parse(savedCamSettings));
    }

    // 8. Session
    const savedSession = sessionStorage.getItem("lb_session");
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
  }, []);

  // Save changes to localStorage helper
  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Auth Functions
  const login = (username: string, password: string) => {
    const lowerUser = username.toLowerCase().trim();
    if (lowerUser === "admin" && password === "admin123") {
      const newSession: UserSession = {
        username: "Admin Dashboard",
        role: "admin",
        token: "admin-jwt-token-simulated-" + Date.now()
      };
      setSession(newSession);
      sessionStorage.setItem("lb_session", JSON.stringify(newSession));
      return { success: true, session: newSession };
    } else if (childProfiles[lowerUser] && password === "parent123") {
      const newSession: UserSession = {
        username: childProfiles[lowerUser].name,
        role: "parent",
        childProfile: childProfiles[lowerUser],
        token: `parent-jwt-${lowerUser}-` + Date.now()
      };
      setSession(newSession);
      sessionStorage.setItem("lb_session", JSON.stringify(newSession));
      return { success: true, session: newSession };
    }
    return { success: false, error: "Invalid username or password. Use 'admin' / 'admin123' or parents 'srinivas' / 'parent123'." };
  };

  const logout = () => {
    setSession(null);
    sessionStorage.removeItem("lb_session");
  };

  // Applications actions
  const submitApplication = (appData: Omit<AdmissionApplication, "id" | "status" | "submittedAt" | "feePaid">) => {
    const id = "LB-ADM-" + Math.floor(100000 + Math.random() * 900000);
    const newApp: AdmissionApplication = {
      ...appData,
      id,
      status: "Pending",
      submittedAt: new Date().toISOString(),
      feePaid: false
    };
    const updated = [newApp, ...applications];
    setApplications(updated);
    saveToStorage("lb_applications", updated);
    return id;
  };

  const updateApplicationStatus = (id: string, status: AdmissionApplication["status"]) => {
    const updated = applications.map(app => (app.id === id ? { ...app, status } : app));
    setApplications(updated);
    saveToStorage("lb_applications", updated);
  };

  const toggleApplicationFee = (id: string) => {
    const updated = applications.map(app => (app.id === id ? { ...app, feePaid: !app.feePaid } : app));
    setApplications(updated);
    saveToStorage("lb_applications", updated);
  };

  const deleteApplication = (id: string) => {
    const updated = applications.filter(app => app.id !== id);
    setApplications(updated);
    saveToStorage("lb_applications", updated);
  };

  // Camera Actions
  const updateCameraSettings = (settings: Partial<CameraSettings>) => {
    const updated = { ...cameraSettings, ...settings };
    setCameraSettings(updated);
    saveToStorage("lb_camera_settings", updated);
  };

  const isCameraAccessible = (cameraName: string) => {
    if (!cameraSettings.enabled) {
      return { accessible: false, reason: "The CCTV classroom cameras have been disabled by the Administrator." };
    }

    if (cameraSettings.restrictHours) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMin = now.getMinutes();
      
      const [startHour, startMin] = cameraSettings.startTime.split(":").map(Number);
      const [endHour, endMin] = cameraSettings.endTime.split(":").map(Number);
      
      const currentVal = currentHour * 60 + currentMin;
      const startVal = startHour * 60 + startMin;
      const endVal = endHour * 60 + endMin;

      // Also check weekend (0 = Sunday, 6 = Saturday)
      const day = now.getDay();
      if (day === 0 || day === 6) {
        return { accessible: false, reason: "CCTV feeds are only available on school days (Monday to Friday)." };
      }

      if (currentVal < startVal || currentVal > endVal) {
        return { 
          accessible: false, 
          reason: `Feeds are restricted to school hours: ${cameraSettings.startTime} to ${cameraSettings.endTime}. Current time is ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.` 
        };
      }
    }

    return { accessible: true };
  };

  // Notices
  const addNotice = (title: string, content: string, category: Notice["category"]) => {
    const newNotice: Notice = {
      id: "n-" + Date.now(),
      title,
      content,
      category,
      date: new Date().toISOString().split("T")[0]
    };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    saveToStorage("lb_notices", updated);
  };

  const deleteNotice = (id: string) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    saveToStorage("lb_notices", updated);
  };

  // Homework
  const addHomework = (classGroup: Homework["class"], subject: string, content: string, dueDate: string) => {
    const newHw: Homework = {
      id: "hw-" + Date.now(),
      class: classGroup,
      subject,
      content,
      dueDate
    };
    const updated = [newHw, ...homeworks];
    setHomeworks(updated);
    saveToStorage("lb_homeworks", updated);
  };

  const deleteHomework = (id: string) => {
    const updated = homeworks.filter(hw => hw.id !== id);
    setHomeworks(updated);
    saveToStorage("lb_homeworks", updated);
  };

  // Form submits
  const submitContactForm = (name: string, email: string, phone: string, subject: string, message: string) => {
    const newContact: ContactMessage = {
      id: "c-" + Date.now(),
      name, email, phone, subject, message,
      date: new Date().toISOString().split("T")[0],
      status: "Unread"
    };
    const updated = [newContact, ...contacts];
    setContacts(updated);
    saveToStorage("lb_contacts", updated);
  };

  const submitCareerForm = (fullName: string, email: string, phone: string, position: string, experience: string, resumeName: string, message: string) => {
    const newCareer: CareerApplication = {
      id: "car-" + Date.now(),
      fullName, email, phone, position, experience, resumeName, message,
      date: new Date().toISOString().split("T")[0]
    };
    const updated = [newCareer, ...careers];
    setCareers(updated);
    saveToStorage("lb_careers", updated);
  };

  const subscribeNewsletter = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (subscribers.includes(cleanEmail)) {
      return { success: false, message: "This email is already subscribed!" };
    }
    const updated = [...subscribers, cleanEmail];
    setSubscribers(updated);
    saveToStorage("lb_subscribers", updated);
    return { success: true, message: "Thank you for subscribing to our newsletter!" };
  };

  const markContactRead = (id: string) => {
    const updated = contacts.map(c => (c.id === id ? { ...c, status: "Read" as const } : c));
    setContacts(updated);
    saveToStorage("lb_contacts", updated);
  };

  return (
    <PlayschoolDbContext.Provider
      value={{
        applications,
        notices,
        homeworks,
        contacts,
        careers,
        subscribers,
        cameraSettings,
        session,
        login,
        logout,
        submitApplication,
        updateApplicationStatus,
        toggleApplicationFee,
        deleteApplication,
        updateCameraSettings,
        isCameraAccessible,
        addNotice,
        deleteNotice,
        addHomework,
        deleteHomework,
        submitContactForm,
        submitCareerForm,
        subscribeNewsletter,
        markContactRead
      }}
    >
      {children}
    </PlayschoolDbContext.Provider>
  );
};

export const usePlayschoolDb = () => {
  const context = useContext(PlayschoolDbContext);
  if (context === undefined) {
    throw new Error("usePlayschoolDb must be used within a PlayschoolDbProvider");
  }
  return context;
};
