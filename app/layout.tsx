import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Spoorthi's The Duckling | Premier School in Hyderabad",
  description: "Excellence in education from Nursery to 7th Grade. Located in Papi Reddy Nagar, Hyderabad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-[Poppins] bg-white antialiased">
        <Navbar />
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
