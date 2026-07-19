import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Gallery | Spoorthi's The Duckling School Hyderabad",
  description: "View photos and videos of campus facilities, classroom events, sports activities, annual day functions, science exhibitions, and cultural celebrations at Spoorthi's The Duckling.",
  keywords: [
    "School photo gallery Hyderabad",
    "Spoorthi's The Duckling pictures",
    "School campus gallery",
    "Sports day celebrations school",
    "Classroom photos",
    "Annual day celebrations school",
    "School tour video Hyderabad"
  ],
  openGraph: {
    title: "Media Gallery | Spoorthi's The Duckling School",
    description: "Explore photos and videos showcasing our campus life, classroom environments, sports achievements, and vibrant celebrations.",
    images: [
      {
        url: "/school1.jpg",
        width: 1200,
        height: 630,
        alt: "Spoorthi's The Duckling Gallery Preview",
      }
    ],
  }
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
