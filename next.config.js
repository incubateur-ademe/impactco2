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
  },
  async redirects() {
    return [
      {
        source: "/iframes/transport/itineraire",
        destination: "/button.html",
        permanent: false,
      },

      {
        source: "http://api.monimpacttransport.fr/beta/:slug*",
        destination: "https://impactco2.fr/api/:slug*",
        permanent: false,
      },
      {
        source: "https://api.monimpacttransport.fr/beta/:slug*",
        destination: "https://impactco2.fr/api/:slug*",
        permanent: false,
      },

      {
        source: "http://teletravail.monimpacttransport.fr/:slug*",
        destination: "https://impactco2.fr/transport/teletravail/:slug*",
        permanent: false,
      },
      {
        source: "https://teletravail.monimpacttransport.fr/:slug*",
        destination: "https://impactco2.fr/transport/teletravail/:slug*",
        permanent: true,
      },
      {
        source: "https://monimpacttransport.fr/iframe.js",
        destination: "https://impactco2.fr/iframe.js",
        permanent: true,
      },

      {
        source: "http://api.monimpacttransport.fr/:slug*",
        destination: "https://impactco2.fr/transport/:slug*",
        permanent: true,
      },
      {
        source: "https://api.monimpacttransport.fr/:slug*",
        destination: "https://impactco2.fr/transport/:slug*",
        permanent: true,
      },
      {
        source: "https://monimpacttransport.fr/:slug*",
        destination: "https://impactco2.fr/transport/:slug*",
        permanent: true,
      },
      {
        source: "https://www.monimpacttransport.fr/:slug*",
        destination: "https://impactco2.fr/transport/:slug*",
        permanent: true,
      },

      {
        source: "http://co2e.fr/:slug*",
        destination: "https://impactco2.fr/:slug*",
        permanent: true,
      },
      {
        source: "https://co2e.fr/:slug*",
        destination: "https://impactco2.fr/:slug*",
        permanent: true,
      },
      {
        source: "http://quelimpactco2.fr/:slug*",
        destination: "https://impactco2.fr/:slug*",
        permanent: true,
      },
      {
        source: "https://quelimpactco2.fr/:slug*",
        destination: "https://impactco2.fr/:slug*",
        permanent: true,
      },
      {
        source: "https://impactco2.ademe.fr/:slug*",
        destination: "https://impactco2.fr/:slug*",
        permanent: true,
      },

      {
        source: "https://monconvertisseurco2.fr/:slug*",
        destination: "https://impactco2.fr/:slug*",
        permanent: true,
      },
      {
        source: "https://www.monconvertisseurco2.fr/:slug*",
        destination: "https://impactco2.fr/:slug*",
        permanent: true,
      },

      {
        source: "/categories/deplacement/:slug*",
        destination: "/transport/:slug*",
        permanent: true,
      },

      {
        source: "/categories/*",
        destination: "/:slug*",
        permanent: false,
      },
      {
        source: "/empreinte-carbone/*",
        destination: "/:slug*",
        permanent: false,
      },
      {
        source: "/iframes/categories/*",
        destination: "/iframes/:slug*",
        permanent: false,
      },
      {
        source: "/iframes/empreinte-carbone/*",
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
