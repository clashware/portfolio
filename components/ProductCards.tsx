"use client"; // This component is interactive, so it's a client component.

import Image from "next/image";
import { motion } from "framer-motion";

export default function ProductCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Metacube Card */}
            <motion.a
                href="https://metacube.games"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden shadow-lg backdrop-filter backdrop-blur-lg"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="relative h-56 w-full">
                    <Image
                        src="/metacube-preview.png"
                        alt="Metacube Preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                        className="rounded-t-lg"
                    />
                </div>
                <div className="p-6">
                    <h4 className="text-2xl font-bold text-white">Metacube</h4>
                    <p className="text-gray-300 mt-2">The future of gaming is here. Explore user-generated worlds and create your own adventures.</p>
                </div>
            </motion.a>

            {/* lengthen.ai Card */}
            <motion.a
                href="https://lengthen.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden shadow-lg backdrop-filter backdrop-blur-lg"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <div className="relative h-56 w-full">
                    <Image
                        src="/lengthen-preview.png"
                        alt="lengthen.ai Preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                        className="rounded-t-lg"
                    />
                </div>
                <div className="p-6">
                    <h4 className="text-2xl font-bold text-white">Lengthen.ai</h4>
                    <p className="text-gray-300 mt-2">Supercharge your content with AI. Generate high-quality text for any purpose.</p>
                </div>
            </motion.a>
        </div>
    );
}
