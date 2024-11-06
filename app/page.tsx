import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-purple-900 to-black-500 relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-900 to-black-500 rounded-full filter blur-2xl animate-pulse delay-2000"></div>
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start z-10 w-full">
        <div className="flex flex-col items-center gap-4 sm:gap-5 w-full justify-center">
          <Image
            priority
            src="/Clashware.png"
            alt="Clashware"
            width={200}
            height={200}
            className="filter  animate-wave mb-4"
          />
          <div className="relative w-max-content overflow-hidden rounded-xl sm:rounded-2xl">
            <div className="drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] p-2 sm:p-3 relative rounded-xl sm:rounded-2xl top-0 left-0 w-full h-full bg-[conic-gradient(at_top,_#2c024a00,_#f3624205)]  bg-[length:200%_200%] bg-left  flex items-center justify-center">
              <h1 className=" text-5xl sm:text-8xl font-bold">Clashware</h1>
              <div className=" absolute inset-0 rounded-xl sm:rounded-3xl bg-gradient-to-r from-white/10 to-transparent animate-light-reflection"></div>
            </div>
          </div>
          <h2 className="text-xl sm:text-4xl text-muted-foreground text-center">
            Building secure and reliable software
          </h2>
          <p className="text-md sm:text-2xl text-muted-foreground text-black-200">
            Coming Soon
          </p>
        </div>
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
