const fs=require('fs');

//Syncronously checking file existence
const isExist=fs.existsSync('demo.txt');
console.log(isExist);
console.log("Checking File Existence Syncronously");

//In this file checking file existence is done in a blocking way means existence result will print first then the last line will print.