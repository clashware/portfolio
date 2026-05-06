import { renderToBuffer } from "@react-pdf/renderer";
import { BrandGuidelinesPDF } from "@/lib/pdf/BrandGuidelinesPDF";

export async function GET() {
  try {
    const pdfBuffer = await renderToBuffer(<BrandGuidelinesPDF />);
    const uint8Array = new Uint8Array(pdfBuffer);

    return new Response(uint8Array, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="clashware-brand-guidelines.pdf"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new Response("Error generating PDF", { status: 500 });
  }
}
