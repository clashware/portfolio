export default function ContactPage() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                <div className="prose prose-invert max-w-none">
                    <p>If you have any questions, you can reach us at:</p>
                    <p>
                        <strong>Clashware Sàrl</strong><br />
                        Avenue de Jurigoz 15<br />
                        1006 Lausanne<br />
                        Switzerland
                    </p>
                    <p>
                        Or you can send us an email at: <a href="mailto:contact@clashware.com" className="text-blue-400 hover:underline">contact@clashware.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
