import { NextRequest, NextResponse } from "next/server";

const MARKDOWN_ROUTES = ["/"];

export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const { pathname } = request.nextUrl;

  const wantsMarkdown = accept.includes("text/markdown");
  const isEligible = MARKDOWN_ROUTES.includes(pathname);

  if (wantsMarkdown && isEligible) {
    const url = request.nextUrl.clone();
    url.pathname = "/md/home";
    const response = NextResponse.rewrite(url);
    response.headers.set("Vary", "Accept, Accept-Encoding");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept, Accept-Encoding");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|api).*)",
  ],
};