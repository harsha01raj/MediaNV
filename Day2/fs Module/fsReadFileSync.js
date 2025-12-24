const fs = require("fs");

//Syncronously reading a file
function readSyncFile() {
  const data = fs.readFileSync("demo.txt", "utf-8");
  console.log(data);
  console.log("Reading File Syncronously");
}
//readSyncFile();

//In this file reading file is done in a blocking way means data will print first then the last line will print.
module.exports = readSyncFile;