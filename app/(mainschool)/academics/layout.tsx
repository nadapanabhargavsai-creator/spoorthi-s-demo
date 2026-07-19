import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics | Spoorthi's The Duckling School Hyderabad",
  description: "Explore our comprehensive CBSE curriculum, offering LKG, UKG, Nursery, and Grades 1-7. Learn about our advanced labs, digital classrooms, teaching methodology, assessment system, and learning resources.",
  keywords: [
    "Academics Spoorthi's The Duckling",
    "CBSE Curriculum Hyderabad",
    "Primary School syllabus Hyderabad",
    "Teaching methodology",
    "Computer Lab school",
    "Science Lab school",
    "School library",
    "Academics calendar Hyderabad"
  ],
  openGraph: {
    title: "Academics & Curriculum | Spoorthi's The Duckling School",
    description: "Explore our classes from Nursery to Grade 7, subjects, teaching methodologies, timings, labs, library, and comprehensive academic support.",
    images: [
      {
        url: "/facility_library.png",
        width: 1200,
        height: 630,
        alt: "Spoorthi's The Duckling Library & Lab facilities",
      }
    ],
  }
};

export default function AcademicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
