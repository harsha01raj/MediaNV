const fs=require('fs');

//Read the file as stream synchronously
const readStream=fs.createReadStream('demo.txt','utf-8');
readStream.on('data',(chunkdata)=>{
    console.log("**********New Chunk**********");
    console.log(chunkdata);
});

console.log("Reading File using Stream");

//In this file reading file is done in a non-blocking way means last line will print first then chunk data will print.  

// Read the file as stream asynchronously
const readStreamAsync=fs.createReadStream('demo.txt','utf-8');
readStreamAsync.on('data',(chunkdata)=>{
    console.log("**********New Chunk Asyncronously**********");
    console.log(chunkdata);
});

console.log("Reading File using Stream Asyncronously");

//In this file reading file is done in a non-blocking way means last line will print first then chunk data will print.


// want to read file a with stream and write to b with stream
fs.createReadStream('demo.txt','utf-8')
.pipe(fs.createWriteStream('streamedDemo.txt'));

console.log("Writing File using Stream");

//In this file writing file is done in a non-blocking way means last line will print first then chunk data will write to file.

