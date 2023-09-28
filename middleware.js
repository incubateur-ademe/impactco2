import { NextResponse } from "next/server";

export function middleware(request) {
  // console.log('request.nextUrl.pathname-------------------------', request.nextUrl.pathname);
  console.log("request.nextUrl", request.nextUrl);
  // console.log(Object.fromEntries(request.nextUrl.searchParams))
  if (request.nextUrl.pathname.startsWith("/iframes/transport/itineraire")) {
    return new NextResponse(
      `
        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
          <a target="_blank" title="Impact du transport sur le climat (ouvre le site impactCO2 dans un nouvel onglet)" href="https://impactco2.fr/transport/itineraire" style="background-color: rgb(38, 130, 124); color:white; cursor:pointer; display:block; padding:1rem; border-radius:8px; text-decoration: none; text-align: center;">
            Decouvrir l'impact carbone du transport sur le climat
          </a>
        </div>
        `,
      { status: 410, headers: { "content-type": "text/html", charset: "utf-8" } }
    );
  }
}
