import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spoorthis The Duckling Pre-School | Hyderabad",
  description:
    "A premium preschool in Hyderabad offering elegant early childhood education focused on creativity, confidence and joyful learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Premium Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="font-[Inter] bg-[#fdfcf9] antialiased">
        {children}
      </body>
    </html>
  );
}
