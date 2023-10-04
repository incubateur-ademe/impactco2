// ES6: import Haikunator from 'haikunator'
var Haikunator = require("haikunator");

// Instantiate Haikunator without options
var haikunator = new Haikunator();

// default usage
const version = haikunator.haikunate(); // => "wispy-dust-1337"

const fs = require("fs");

const filePath = "./version.txt";

writeToFile(filePath, version);

async function writeToFile(filePath, text) {
  // Open the file for writing
  const fileHandle = await fs.promises.open(filePath, "w");

  // Write the text to the file
  await fs.promises.writeFile(fileHandle, text);

  // Close the file
  await fileHandle.close();
}
