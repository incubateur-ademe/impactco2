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

const getBeforeLastSha = function () {
  let result = "unknown";
  result = fs.readFileSync("./version.txt", "utf8");
  console.log("Current name is :", result);
  return result;
};

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  env: {
    thebuildid: getLastVersion() + "-" + getBeforeLastSha(),
    customKey: "my-value",
    thesha: process.env.SOURCE_VERSION || process.env.COMMIT_REF,
  },
  async redirects() {
    return [
      {
        source: "/beta/:slug*",
        destination: "/api/:slug*",
        permanent: true,
      },
      {
        source: "/categories/deplacement/:slug*",
        destination: "/transport/:slug*",
        permanent: true,
      },

      {
        source: "/categories/:slug*",
        destination: "/:slug*",
        permanent: false,
      },
      {
        source: "/empreinte-carbone/:slug*",
        destination: "/:slug*",
        permanent: false,
      },
      {
        source: "/iframes/categories/:slug*",
        destination: "/iframes/:slug*",
        permanent: false,
      },
      {
        source: "/iframes/empreinte-carbone/:slug*",
        destination: "/iframes/:slug*",
        permanent: false,
      },

      {
        source: "/iframes/tuiles",
        destination: "/iframes/convertisseur",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
