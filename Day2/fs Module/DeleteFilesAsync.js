const fs=require('fs');

//Asyncronously Deleting a file
fs.unlink('demo.txt',(err)=>{
    if(err){
        console.log('Error',err);
    }else{
        console.log("File Deleted successfully");
    }       
})
console.log("Deleting the File Asyncronously");

//In this file deleting file is done in a non-blocking way means last line will print first then "File Deleted successfully" will print.