// ES6: import Haikunator from 'haikunator'
var Haikunator = require("haikunator");

// Instantiate Haikunator without options
var haikunator = new Haikunator();

// default usage
const version = haikunator.haikunate(); // => "wispy-dust-1337"

const fs = require("fs");

const filePath = "./version.txt";

fs.appendFile(filePath, version + "\n", (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Version was successfully written to the file.");
});
