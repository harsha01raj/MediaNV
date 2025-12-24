const fs=require('fs');
const readSyncFile = require("./fsReadFileSync");

//Syncronously Over write the file
fs.writeFileSync('demo.txt',"Hello I have replace the file content");
console.log("File Over Write successfully");

//In this file writing file is done in a blocking way means "File written successfully" will print first.      
readSyncFile();