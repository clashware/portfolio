import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-purple-900 to-black-500">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center gap-5">
          <Image
            priority
            src="/Clashware.png"
            alt="Clashware"
            width={200}
            height={200}
          />
          <h1 className="text-6xl sm:text-8xl font-bold ">Clashware</h1>
          <h2 className="text-2xl sm:text-4xl   text-muted-foreground">
            Be ready to Clash!
          </h2>
          <p className="text-lg sm:text-2xl text-muted-foreground">
            Coming Soon
          </p>
        </div>
      </main>
    </div>
  );
}
