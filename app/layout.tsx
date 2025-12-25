import "./globals.css";

// Root layout just passes through to locale layouts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
