import { Link } from "@/lib/i18n/routing";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-[#0A0A0F] flex items-center justify-center p-4">
      <div className="relative border border-[#27272A] p-8 w-full max-w-lg font-mono">
        <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-[#EF4444]" />
        <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-[#EF4444]" />
        <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-[#EF4444]" />
        <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-[#EF4444]" />

        <div className="mb-8">
          <h2 className="text-[#EF4444] text-xl font-bold mb-2">[ERR_404]</h2>
          <p className="text-[#A1A1AA] text-sm">Page not found.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/"
            className="border border-[#EF4444] text-[#EF4444] bg-transparent px-4 py-2 rounded-none font-mono text-xs uppercase hover:bg-[#EF4444]/10 transition-colors inline-block"
          >
            Go home
          </Link>
          <div className="text-[#A1A1AA] text-xs">
            &gt; Redirecting to root...<span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
}
