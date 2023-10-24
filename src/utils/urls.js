export function buildCurrentUrlFor(domain, path) {
  let localDomain = domain || "notdefined";
  let securedPrefix = localDomain.indexOf("localhost") === -1 ? "s" : "";
  return `http${securedPrefix}://${localDomain}${path}`;
}
