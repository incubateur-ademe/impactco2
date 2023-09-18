const config = require("../../webpack.config.js");
const webpack = require("webpack");

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
  }
  console.log(`https://${process.env.NODE_VERSION}/iframes/livraison/simulation`);
  console.log("Done.......");
});
