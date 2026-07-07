// Root passthrough layout: required so app/not-found.tsx can render.
// html/body are rendered by app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
