const fs=require('fs');

//Syncronously  deleting a file
fs.unlinkSync('demo.txt');
console.log("File Deleted successfully");

//In this file deleting file is done in a blocking way means "File Deleted successfully" will print first.  
