const path =require('path');

//__dirname gives the current directory path
console.log("Current Directory Path:",__dirname);

//__filename gives the current file path
console.log("Current File Path:",__filename);

//Using path module to get the base name of the file
console.log("Base Name of the File:",path.basename(__filename));

//Using path module to get the directory name
console.log("Directory Name:",path.dirname(__filename));

//Using path module to get the file extension
console.log("File Extension:",path.extname(__filename));    


//Path join example
// const newPath = path.join(__dirname,'subfolder','file.txt');
// console.log("Joined Path:",newPath);

// const filePath = path.join(
//   __dirname,
//   'fs Module',
//   'copyOfDemo.txt'
// );