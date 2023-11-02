// import * as nock from "nock";
const nock = require("nock");

// nock('https://api.example.com')
// .get('/users/1')
// .reply(200, { id: 1, name: 'John Doe' });

// nock('https://deploy-preview-1895--ecolab-data.netlify.app/co2-model.FR-lang.fr.json')
// .get('')
// .reply(200, { id: 1, name: 'John Doe' });

nock.emitter.on("no match", (req) => {
  throw new Error(`Unexpected request was sent to ${req.path}`);
});
// nock.disableNetConnect();
