import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col overflow-x-clip">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
