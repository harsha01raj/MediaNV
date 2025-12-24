const fs=require('fs');

//Syncronously print the stats of a file
const stats=fs.statSync('demo.txt');
//console.log(stats);
console.log("Getting the File Stats Syncronously");
console.log(stats.isFile());
console.log(stats.isDirectory());
console.log(stats.size);

//In this file getting file stats is done in a blocking way means stats will print first then the last line will print.