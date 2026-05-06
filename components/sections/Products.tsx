"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  Gamepad2,
  Video,
  TrendingUp,
  FileSignature,
} from "lucide-react";
import { useTranslations } from "next-intl";

const productData = [
  {
    id: "metacube",
    url: "https://metacube.games",
    image: "/metacube-preview.png",
    icon: Gamepad2,
    tagKeys: ["gaming", "multiplayer", "web3"],
  },
  {
    id: "bonega",
    url: "https://bonega.ai",
    image: "/lengthen-preview.png",
    icon: Video,
    tagKeys: ["ai", "video", "content"],
  },
  {
    id: "coira",
    url: "https://coira.io",
    image: "/coira-preview.png",
    icon: TrendingUp,
    tagKeys: ["crypto", "ai", "research"],
  },
  {
    id: "waiverkit",
    url: "https://waiverkit.io",
    image: "/waiverkit-preview.png",
    icon: FileSignature,
    tagKeys: ["saas", "legal", "signature"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Products() {
  const t = useTranslations("products");

  return (
    <section id="products" className="py-24 border-t border-[#27272A] px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 border-l-2 border-[#DC2626] pl-4"
        >
          <div className="font-mono text-sm text-[#A1A1AA] mb-2">// MODULE: 01</div>
          <h2 className="text-4xl font-bold uppercase tracking-tight text-white">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-[#A1A1AA]">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-6"
        >
          {productData.map((product, index) => {
            const Icon = product.icon;

            return (
              <motion.div key={product.id} variants={itemVariants}>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex flex-col lg:flex-row border border-[#27272A] bg-transparent group-hover:bg-[#18181B] transition-colors duration-300 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#27272A] group-hover:bg-[#DC2626] transition-colors duration-300 z-10" />

                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center pl-8 lg:pl-10">
                      <div className="font-mono text-xs text-[#A1A1AA] mb-4">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="flex flex-col mb-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6 text-white group-hover:text-[#DC2626] transition-colors duration-300" />
                          <h3 className="text-2xl font-bold uppercase text-white group-hover:text-[#DC2626] transition-colors duration-300 flex items-center gap-2">
                            {t(`${product.id}.name`)}
                            <ArrowUpRight className="w-6 h-6 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 text-[#DC2626]" />
                          </h3>
                        </div>
                        <div className="text-sm text-[#A1A1AA] mt-1">
                          {t(`${product.id}.tagline`)}
                        </div>
                      </div>

                      <p className="text-sm text-[#A1A1AA] max-w-xl mb-6 leading-relaxed">
                        {t(`${product.id}.description`)}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {product.tagKeys.map((tagKey) => (
                          <Badge
                            key={tagKey}
                            variant="outline"
                            className="rounded-none border-[#27272A] font-mono text-[10px] uppercase text-[#A1A1AA] bg-transparent hover:bg-transparent"
                          >
                            {t(`tags.${tagKey}`)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="w-full lg:w-[400px] xl:w-[500px] relative overflow-hidden shrink-0 border-t lg:border-t-0 lg:border-l border-[#27272A] min-h-[250px] lg:min-h-[300px]">
                      <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                          background: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)'
                        }}
                      />
                      <Image
                        src={product.image}
                        alt={t(`${product.id}.name`)}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
