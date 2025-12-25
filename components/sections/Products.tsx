"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Gamepad2, Video, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

const productData = [
  {
    id: "metacube",
    url: "https://metacube.games",
    image: "/metacube-preview.png",
    icon: Gamepad2,
    logo: null,
    color: "metacube",
    tagKeys: ["gaming", "multiplayer", "web3"],
  },
  {
    id: "bonega",
    url: "https://bonega.ai",
    image: "/lengthen-preview.png",
    icon: Video,
    logo: null,
    color: "bonega",
    tagKeys: ["ai", "video", "content"],
  },
  {
    id: "coira",
    url: "https://coira.io",
    image: "/coira-preview.png",
    icon: TrendingUp,
    logo: null,
    color: "coira",
    tagKeys: ["crypto", "ai", "research"],
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

const cardVariants = {
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
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snow mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-zinc max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Product Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {productData.map((product) => {
            const Icon = product.icon;
            const glowClass = `glow-${product.color}`;
            const borderColorClass =
              product.color === "metacube"
                ? "hover:border-metacube/50"
                : product.color === "bonega"
                  ? "hover:border-bonega/50"
                  : "hover:border-coira/50";

            return (
              <motion.div key={product.id} variants={cardVariants}>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <Card
                    className={`glass h-full overflow-hidden transition-all duration-300 hover-lift pt-0 ${glowClass} ${borderColorClass}`}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={t(`${product.id}.name`)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/80 to-transparent" />

                      {/* Icon/Logo Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden ${
                            product.color === "metacube"
                              ? "bg-metacube/20"
                              : product.color === "bonega"
                                ? "bg-bonega/20"
                                : "bg-coira/20"
                          }`}
                        >
                          {product.logo ? (
                            <Image
                              src={product.logo}
                              alt={`${t(`${product.id}.name`)} logo`}
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          ) : (
                            <Icon
                              className={`w-5 h-5 ${
                                product.color === "metacube"
                                  ? "text-metacube"
                                  : product.color === "bonega"
                                    ? "text-bonega"
                                    : "text-coira"
                              }`}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-snow group-hover:gradient-brand-text transition-all">
                          {t(`${product.id}.name`)}
                        </CardTitle>
                        <ArrowUpRight className="w-5 h-5 text-zinc group-hover:text-snow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <p
                        className={`text-sm font-medium ${
                          product.color === "metacube"
                            ? "text-metacube"
                            : product.color === "bonega"
                              ? "text-bonega"
                              : "text-coira"
                        }`}
                      >
                        {t(`${product.id}.tagline`)}
                      </p>
                    </CardHeader>

                    <CardContent>
                      <p className="text-zinc mb-4 text-sm leading-relaxed">
                        {t(`${product.id}.description`)}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {product.tagKeys.map((tagKey) => (
                          <Badge
                            key={tagKey}
                            variant="secondary"
                            className="bg-slate-elevated text-stone text-xs"
                          >
                            {t(`tags.${tagKey}`)}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
