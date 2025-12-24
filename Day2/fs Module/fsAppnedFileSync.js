const fs=require('fs');
const readSyncFile = require("./fsReadFileSync");

fs.appendFileSync('demo.txt',"\n Hello i have appnended the data to file");
console.log("File Appended successfully");

//In this file appending file is done in a blocking way means "File Appended successfully" will print first.    
readSyncFile();