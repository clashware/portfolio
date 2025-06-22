import Link from 'next/link';
import { Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Clashware Sàrl</h3>
                    <p className="text-sm text-gray-400">Avenue de Jurigoz 15<br />1006 Lausanne<br />Switzerland</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                        <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                        <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Social</h3>
                    <div className="flex space-x-4">
                        <a href="https://x.com/clashware" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <Twitter />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="https://www.linkedin.com/company/107706302/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                            <Linkedin />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} Clashware Sàrl. All rights reserved.</p>
            </div>
        </footer>
    );
}
