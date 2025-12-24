const fs=require('fs');
const readAsyncFile = require('./fsReadFileAsync');

//Asycronously Appending data to a file
fs.appendFile('demo.txt',"\n Hello i have appnended the data to file",(err)=>{
    if(err){
        console.log('Error',err);
    }else{
        console.log("File Appended successfully");
    }
})
console.log("Appending the File Asyncronously");

//In this file appending file is done in a non-blocking way means last line will print first then "File Appended successfully" will print.  
readAsyncFile();