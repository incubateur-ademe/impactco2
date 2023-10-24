var fs = require("fs");
var execSync = require("child_process").execSync;

const getLocalGitCommitHash = function () {
  let res = "";
  try {
    res = execSync("git rev-parse HEAD").toString().trim();
  } catch (e) {
    console.log("Git is not executable here...");
  }
  return res;
};

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
  } else {
    result = "No release versions found in the CHANGELOG.";
  }
  return result;
};

const buildFullVersionNumber = function () {
  const semver = getLastVersion();
  console.log("Current semver version:", semver);
  return semver;
};

const buildShortSha = function (scalingoLongSha) {
  const netlifySha = process.env.COMMIT_REF;
  const shortSha = getShortSha(scalingoLongSha || netlifySha || getLocalGitCommitHash());
  console.log("Current shortSha is: ", shortSha);
  return shortSha;
};

const getShortSha = function (str) {
  let res = "";
  if (typeof str === "string" && str.length > 0) {
    res = str.substring(0, 7);
  }
  return res;
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
    thebuildid: buildFullVersionNumber() + "-" + buildShortSha(process.env.SOURCE_VERSION),
    websiteurl: process.env.WEBSITE_URL,
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
