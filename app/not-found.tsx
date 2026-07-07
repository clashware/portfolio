"use client";

// Boundary for notFound() thrown ABOVE the [locale] not-found boundary
// (e.g. the locale validation in app/[locale]/layout.tsx). Unmatched URLs
// are handled by app/global-not-found.tsx instead. Standard next-intl
// pattern: https://next-intl.dev/docs/environments/error-files
// No layout CSS is guaranteed here, so styling is inline.
const bodyStyle: React.CSSProperties = {
  margin: 0,
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#0A0A0F",
  color: "#FAFAFA",
  fontFamily: "ui-monospace, monospace",
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={bodyStyle}>
        <p>[ERR_404] This page could not be found.</p>
      </body>
    </html>
  );
}
