const fs=require('fs');

//Asyncronously print the stats of a file
fs.stat('demo.txt',(err,stats)=>{
    if(err){
        console.log('Error',err);
    }else{
        console.log(stats);
    }       
})
console.log("Getting the File Stats Asyncronously");

//In this file getting file stats is done in a non-blocking way means last line will print first then stats will print.