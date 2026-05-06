"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Terminal, Cpu, Network, Activity } from "lucide-react";
import { useTranslations } from "next-intl";
import ParticleField from "@/components/ui/ParticleField";

export default function Hero() {
  const t = useTranslations("hero");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime(new Date().toISOString());
    const interval = setInterval(() => {
      setTime(new Date().toISOString());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const leftVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: customEasing }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: customEasing, delay: 0.1 }
    }
  };

  return (
    <section className="relative min-h-dvh flex flex-col justify-center overflow-hidden bg-obsidian pt-24 sm:pt-20">
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b lg:bg-gradient-to-r from-[#0A0A0F]/95 via-[#0A0A0F]/70 to-transparent" />

      <div
        className="absolute inset-0 z-[2] opacity-20 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(to right, #27272A 1px, transparent 1px), linear-gradient(to bottom, #27272A 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            initial="hidden"
            animate="visible"
            variants={leftVariants}
          >
            <div className="inline-flex items-center gap-3 border border-[#27272A] px-3 py-1.5 mb-8 bg-black/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">
                EPFL Engineering Alumni
              </span>
            </div>

            <h1 className="text-[2.75rem] sm:text-7xl lg:text-8xl font-bold tracking-tight uppercase mb-6 break-words">
              <span className="text-white">Clash</span>
              <span className="text-[#DC2626]">ware</span>
            </h1>

            <p className="text-2xl sm:text-3xl text-[#A1A1AA] mb-8 max-w-2xl text-balance">
              {t("tagline")}
            </p>

            <div className="border-l-2 border-[#27272A] pl-4 mb-10">
              <p className="font-mono text-sm text-zinc-400 max-w-xl text-balance">
                {t("subtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-[#DC2626] hover:bg-[#b91c1c] text-white rounded-none font-mono uppercase px-8 py-6 h-auto transition-colors"
                onClick={scrollToProducts}
              >
                {t("exploreProducts")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#27272A] hover:bg-[#27272A] hover:text-white text-zinc-300 rounded-none font-mono uppercase px-8 py-6 h-auto bg-transparent transition-colors"
                asChild
              >
                <a href="#about">{t("learnMore")}</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:block lg:col-span-5 relative"
            initial="hidden"
            animate="visible"
            variants={rightVariants}
          >
            <div className="relative border border-[#27272A] bg-[#0A0A0F] font-mono text-xs text-zinc-400 p-6 shadow-2xl">
              <div className="absolute -top-[2px] -left-[2px] w-3 h-3 border-t-2 border-l-2 border-[#DC2626]" />
              <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-2 border-r-2 border-[#DC2626]" />
              <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-2 border-l-2 border-[#DC2626]" />
              <div className="absolute -bottom-[2px] -right-[2px] w-3 h-3 border-b-2 border-r-2 border-[#DC2626]" />

              <div className="flex items-center justify-between border-b border-[#27272A] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#DC2626]" />
                  <span className="text-white font-bold tracking-wider">SYSTEM.STATUS</span>
                </div>
                <div className="text-zinc-500">{time || "INITIALIZING..."}</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-zinc-500" />
                    <span>CORE_LOAD</span>
                  </div>
                  <span className="text-white">24.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Network className="w-4 h-4 text-zinc-500" />
                    <span>NETWORK_LATENCY</span>
                  </div>
                  <span className="text-[#10B981]">14ms ZRH</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-zinc-500" />
                    <span>ACTIVE_NODES</span>
                  </div>
                  <span className="text-white">1,024</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#27272A] text-[#DC2626] flex items-center">
                <span className="mr-2">&gt;</span>
                <span className="animate-pulse">AWAITING_INPUT_</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: customEasing }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-auto"
      >
        <span className="font-mono text-xs uppercase text-zinc-500 tracking-widest">Scroll</span>
        <button
          onClick={scrollToProducts}
          className="text-zinc-500 hover:text-white transition-colors"
          aria-label="Scroll to products"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
