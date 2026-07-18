import PlayschoolNavbar from "./components/Navbar";
import PlayschoolFooter from "./components/Footer";
import { PlayschoolDbProvider } from "./context/PlayschoolDb";

export default function PlayschoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PlayschoolDbProvider>
      <div className="font-['Quicksand'] bg-[#FDFBF7] text-gray-800 min-h-screen flex flex-col antialiased">
        <PlayschoolNavbar />
        {/* Main Content Area */}
        <main className="flex-grow pt-20">
          {children}
        </main>
        <PlayschoolFooter />
      </div>
    </PlayschoolDbProvider>
  );
}
