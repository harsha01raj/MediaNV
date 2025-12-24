const fs=require('fs');
const readAsyncFile = require('./fsReadFileAsync.js');

//Asyncronously Over write the file
fs.writeFile('demo.txt',"Hello I have replace the file content",(err)=>{
    if(err){
        console.log('Error',err);
    }else{
        console.log("File Over Write successfully");
    }       
})
console.log("Over Writing the File Asyncronously");
readAsyncFile();


//In this file writing file is done in a non-blocking way means last line will print first then "File written successfully" will print.