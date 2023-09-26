import { HTMLRewriter } from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request, context) => {
  console.log("context", context);

  // get HTTP referer header value
  const referer = request.headers.get("referer");
  console.log("referer--------------------------------------------", referer);

  // get the next HTTP response in the chain
  const response = await context.next();

  // if no referer, return the response
  if (referer === null) {
    return response;
  } else {
    return new HTMLRewriter()
      .on("body", {
        element(element) {
          element.setInnerContent(`Hello, Reddit user! <a href="https://go">Visit this link!</a>`, { html: true });
          element.setAttribute("class", "showMessage");
        },
      })
      .transform(response);
  }
};
export const config = { path: "/iframes/transport/itineraire" };
