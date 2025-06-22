export default function AboutPage() {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold mb-8">About Clashware</h1>
                <div className="prose prose-invert max-w-none">
                    <p>Clashware Sàrl is a Swiss company focused on the development, marketing, and operation of innovative IT products.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
                    <p>Our goal is to provide cutting-edge software solutions and services, including consulting and support in the IT field. We are passionate about technology and dedicated to creating products that push boundaries.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Company Information</h2>
                    <p>
                        <strong>Legal Name:</strong> Clashware Sàrl<br />
                        <strong>Legal Form:</strong> Limited Liability Company (Société à responsabilité limitée)<br />
                        <strong>Address:</strong> Avenue de Jurigoz 15, 1006 Lausanne, Switzerland<br />
                        <strong>UID:</strong> CHE-178.795.076<br />
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Purpose</h2>
                    <p>The company's purpose is the development, marketing, operation, and trade of IT products. In addition, the company aims to provide services, particularly consulting and support services in the IT field. The company may establish branches and subsidiaries and may participate in other companies, both in Switzerland and abroad, and generally carry out any activity directly or indirectly related to its purpose.</p>
                </div>
            </div>
        </div>
    );
}
