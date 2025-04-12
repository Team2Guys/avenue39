import { NextRequest, NextResponse } from "next/server";

const redirects: Record<string, string> = {
  "/collections/dining-table": "/dining/tables",
  "/collections/dining-chair": "/dining/chairs",
  "/collections/living-room-furniture": "/living",
  "/collections/side-cabinets": "/living/side-cabinets",
  "/collections/sofas": "/living/sofas",
  "/collections/sofa-beds": "/living/sofa-beds",
  "/collections/bedroom-furniture": "/bedroom",
  "/collections/bedside-tables": "/bedroom/bedside-tables",
  "/collections/tv-stand": "/bedroom/tv-stands",
  "/collections/office-furniture": "/office-furniture",
  "/collections/office-chairs": "/office-furniture/chairs",
  "/collections/office-tables": "/office-furniture/desks",
  "/collections/chairs": "/chairs",
  "/collections/armchairs": "/chairs/armchairs",
  "/collections/accent-chairs": "/chairs/accent-chairs",
  "/collections/barstools": "/chairs/barstools",
  "/collections/tables": "/tables",
  "/collections/side-tables": "/tables/side-tables",
  "/collections/coffee-table": "/tables/coffee-tables",
  "/collections/lighting": "/lighting",
  "/collections/floor-lamps": "/lighting/floor-lamps",
  "/collections/table-lamps": "/lighting/table-lamps",
  "/collections/accessories": "/accessories",
  "/pages/contact": "/contact-us",
  "/pages/about-us": "/about-us",
  "/pages/terms-conditions": "/terms-and-conditions",
  "/pages/privacy-policy": "/privacy-policy",
  "/pages/shipping-policy": "/shipping-policy",
  "/pages/return-policy": "/return-policy",
  "/collections/new-arrivals": "/new-arrivals",
  "/collections/clearance": "/sale",
  "/pages/wishlist": "/wishlist",
  "/collections/frontpage": "/",
  "/collections/all": "/new-arrivals",
  "/collections/living-storage": "/living",
};


export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const redirectTo = redirects[nextUrl.pathname];
  console.log(redirectTo, "redirect")
  if (redirectTo) {
    const response = NextResponse.redirect(new URL(redirectTo, nextUrl.origin), 302);
    response.headers.set("X-Debug-Redirect", redirectTo);
    console.log(redirectTo, "redirect")
    return response;
  }

  return NextResponse.next();
}


// export const config = {
//   matcher: ["/collections/:path*", "/pages/:path*"], 
//   runtime: "nodejs",
// };
