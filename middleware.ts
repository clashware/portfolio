import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files
  // - Internal Next.js files
  matcher: [
    "/",
    "/(fr|de|it|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
