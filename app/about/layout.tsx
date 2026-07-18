import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Spoorthi's The Duckling School Hyderabad",
  description: "Learn about the history, vision, mission, and educational philosophy of Spoorthi's The Duckling, Hyderabad's premier school offering CBSE curriculum from Nursery to 7th Grade.",
  keywords: [
    "About Spoorthi's The Duckling",
    "Best school in Papi Reddy Nagar",
    "CBSE school Hyderabad",
    "Primary school Hyderabad",
    "School vision and mission",
    "Spoorthi's Academy Hyderabad"
  ],
  openGraph: {
    title: "About Us | Spoorthi's The Duckling School",
    description: "Discover our educational journey, values, and why we are chosen by parents for excellence in education.",
    images: [
      {
        url: "/about.jpg",
        width: 1200,
        height: 630,
        alt: "Spoorthi's The Duckling Campus",
      }
    ],
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
