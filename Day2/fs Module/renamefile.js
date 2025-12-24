const fs=require('fs');

//Syncronously rename the file
fs.renameSync('demo.txt','renamedDemo.txt');
console.log("File Renamed successfully");

//In this file renaming file is done in a blocking way means "File Renamed successfully" will print first.