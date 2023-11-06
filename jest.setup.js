const nock = require("nock");

nock.emitter.on("no match", (req) => {
  throw new Error(`Unexpected request was sent to ${req.path}`);
});
