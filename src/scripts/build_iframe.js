const config = require("../../webpack.config.js");
const webpack = require("webpack");

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }
  console.log(`Trying to build https://${process.env.NEXT_PUBLIC_SITE_URL}/iframes/livraison/simulation`);
  console.log("Done.......");
});
