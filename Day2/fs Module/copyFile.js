const fs =require('fs');

//Syncronously copying a file
fs.copyFileSync('demo.txt','copyOfDemo.txt');
console.log("File Copied successfully");

//In this file copying file is done in a blocking way means "File Copied successfully" will print first.    

