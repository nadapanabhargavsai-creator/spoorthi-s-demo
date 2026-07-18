import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-[Poppins] bg-white antialiased flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
