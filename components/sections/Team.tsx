"use client";

import { useState } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/brand-icons";
import { useTranslations } from "next-intl";

const teamData = [
  {
    id: "kamyar",
    image: "/team/kamyar.png",
    initials: "KT",
    socials: [
      { icon: GithubIcon, href: "https://github.com/KamyarTaher", label: "GitHub" },
      { icon: LinkedinIcon, href: "https://linkedin.com/in/kamyar-taher-4380b614a", label: "LinkedIn" },
      { icon: TwitterIcon, href: "https://x.com/makray1", label: "X" },
    ],
  },
  {
    id: "bastien",
    image: "/team/bastien.png",
    initials: "BF",
    socials: [
      { icon: GithubIcon, href: "https://github.com/bastienfaivre", label: "GitHub" },
      { icon: LinkedinIcon, href: "https://linkedin.com/in/bastienfaivre", label: "LinkedIn" },
      { icon: Globe, href: "https://bastienfaivre.com", label: "Website" },
    ],
  },
  {
    id: "nils",
    image: "/team/nils.png",
    initials: "ND",
    socials: [
      { icon: LinkedinIcon, href: "https://linkedin.com/in/nils-delage-934a67239", label: "LinkedIn" },
    ],
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

function TeamPhoto({ src, alt, initials }: { src: string; alt: string; initials: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 bg-[#18181B] flex items-center justify-center">
        <span className="text-4xl font-bold text-zinc font-mono">{initials}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
      sizes="(max-width: 768px) 100vw, 33vw"
      onError={() => setError(true)}
    />
  );
}

export default function Team() {
  const t = useTranslations("team");

  return (
    <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 bg-obsidian">
      <div className="max-w-7xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 border-l-2 border-[#D03232] pl-6"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#A1A1AA] block mb-2">
            {t("label")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-snow uppercase tracking-tight">
            {t("title")}
          </h2>
          <p className="text-lg text-[#A1A1AA] mt-4 max-w-2xl font-mono text-sm uppercase">
            {t("subtitle")}
          </p>
        </m.div>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamData.map((member) => (
            <m.div key={member.id} variants={cardVariants}>
              <div className="group border border-[#27272A] rounded-none bg-transparent hover:bg-[#18181B] transition-colors duration-300 h-full flex flex-col">
                <div className="relative h-80 overflow-hidden border-b border-[#27272A]">
                  <TeamPhoto
                    src={member.image}
                    alt={t(`${member.id}.name`)}
                    initials={member.initials}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-snow mb-1 uppercase tracking-tight">
                    {t(`${member.id}.name`)}
                  </h3>
                  <p className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest mb-4">
                    {t(`${member.id}.role`)}
                  </p>

                  <p className="text-xs text-stone mb-4 font-mono">
                    {t(`${member.id}.education`)}
                  </p>

                  <p className="text-sm text-zinc leading-relaxed mb-6 flex-grow">
                    {t(`${member.id}.bio`)}
                  </p>

                  <div className="flex gap-2 mt-auto pt-4 border-t border-[#27272A]">
                    {member.socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-[#27272A] p-2 rounded-none text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#FAFAFA] transition-all duration-300"
                          aria-label={t("socialAria", { name: t(`${member.id}.name`), network: social.label })}
                        >
                          <Icon className="w-4 h-4" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
