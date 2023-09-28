var shell = require("shelljs");
var fs = require("fs");

const getLastVersion = function () {
  let result = "unknown";
  const data = fs.readFileSync("./CHANGELOG.md", "utf8");
  // Define the regular expression pattern to match version numbers
  const versionPattern = /^##\s\[?(\d+\.\d+\.\d+)\]?(?:.*?)$/m;

  // Search for version numbers in the CHANGELOG
  const versions = data.match(versionPattern);

  if (versions && versions.length > 1) {
    // The latest version will be the second match
    result = versions[1];
    console.log("Latest release version:", result);
  } else {
    console.log("No release versions found in the CHANGELOG.");
  }
  return result;
};

const nextConfig = {
  experimental: {
    allowMiddlewareResponseBody: true,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  env: {
    thebuildid: getLastVersion() + "-" + shell.exec("git rev-parse --short HEAD"),
    customKey: "my-value",
  },
};

module.exports = nextConfig;
