const fs=require('fs');
//Syncronously Deleting a folder
fs.rmdirSync('myDirectory');
console.log("Directory Deleted successfully");

//In this file deleting directory is done in a blocking way means "Directory Deleted successfully" will print first.