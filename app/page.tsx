import Image from "next/image";
import ProductCards from "../components/ProductCards"; // Import the new component

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-0 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-purple-900 to-black relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
      </div>

      <header className="flex flex-col gap-8 row-start-1 items-center sm:items-start z-10 w-full">
        <div className="flex flex-col items-center gap-4 sm:gap-5 w-full justify-center">
          <Image
            priority
            src="/Clashware.png"
            alt="Clashware"
            width={200}
            height={200}
            className="filter animate-wave mb-4"
          />
          <div className="relative w-max-content overflow-hidden rounded-xl sm:rounded-2xl">
            <div className="drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] p-2 sm:p-3 relative rounded-xl sm:rounded-2xl top-0 left-0 w-full h-full bg-[conic-gradient(at_top,_#2c024a00,_#f3624205)] bg-[length:200%_200%] bg-left flex items-center justify-center">
              <h1 className="text-5xl sm:text-8xl font-bold text-white">Clashware</h1>
              <div className="absolute inset-0 rounded-xl sm:rounded-3xl bg-gradient-to-r from-white/10 to-transparent animate-light-reflection"></div>
            </div>
          </div>
          <h2 className="text-xl sm:text-4xl text-gray-300 text-center">
            Be ready to clash!
          </h2>
        </div>
      </header>

      <main className="row-start-2 z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-4xl font-bold text-center text-white mb-12">Our Products</h3>
        <ProductCards />
      </main>

      {/* Animated swords */}
      <div className="absolute top-10 right-10 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="purple"
          className="w-10 h-10 transform rotate-45"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 3l-10.5 10.5L6 21l7.5-1.5L21 6.75M12 5.25l6.75 6.75"
          />
        </svg>
      </div>
      <div className="absolute top-20 left-16 animate-spin-slow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="pink"
          className="w-10 h-10 transform rotate-45"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 3l-10.5 10.5L6 21l7.5-1.5L21 6.75M12 5.25l6.75 6.75"
          />
        </svg>
      </div>
    </div>
  );
}
