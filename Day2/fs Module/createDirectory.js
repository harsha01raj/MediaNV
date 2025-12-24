const fs=require('fs');

//Create a directory
fs.mkdir('NewDirectory',(err)=>{
    if(err){
        console.log('Error',err);
    }else{
        console.log("Directory created successfully");
    }       
})
console.log("Creating Directory Asyncronously");


//In this file creating directory is done in a non-blocking way means last line will print first then "Directory created successfully" will print.

