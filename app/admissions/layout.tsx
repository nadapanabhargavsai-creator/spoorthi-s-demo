import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions | Spoorthi's The Duckling School Hyderabad",
  description: "Explore the admissions process, fee structure, eligibility criteria, required documents, and guidelines at Spoorthi's The Duckling. Secure your child's seat today.",
  keywords: [
    "School admissions Hyderabad",
    "Spoorthi's The Duckling Admissions",
    "School fee structure Hyderabad",
    "Apply now school Hyderabad",
    "Eligibility criteria school",
    "Required documents school admission",
    "Scholarships school Hyderabad"
  ],
  openGraph: {
    title: "Admissions | Spoorthi's The Duckling School",
    description: "Learn about school admissions, fee details, timelines, guidelines, and apply online today.",
    images: [
      {
        url: "/about.jpg",
        width: 1200,
        height: 630,
        alt: "Spoorthi's The Duckling Admissions Hub",
      }
    ],
  }
};

export default function AdmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
