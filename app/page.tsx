import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Welcome to Daily Task Manager
        </h1>
      </main>

      <Footer />
    </>
  );
}