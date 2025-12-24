//Asyncronously reading a file
const fs = require("fs");
function readAsyncFile() {
  fs.readFile("demo.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log(data);
    }
  });
  console.log("Reading File Asyncronously");
}
//readAsyncFile();

module.exports = readAsyncFile;

//In this file reading file is done in a non-blocking way means last line will print first then data will print.
