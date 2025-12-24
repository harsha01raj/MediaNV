console.log(os.platform());
console.log(os.arch());
const os = require('os');

//Get the total memory of the system
console.log("Total Memory:", os.totalmem());

//Get the free memory of the system
console.log("Free Memory:", os.freemem());

//Get the CPU information
console.log("CPU Information:", os.cpus());

//Get the system uptime
console.log("System Uptime (in seconds):", os.uptime());        

//Get the home directory of the current user
console.log("Home Directory:", os.homedir());

//Get the hostname of the system
console.log("Hostname:", os.hostname());

//Get the operating system type
console.log("OS Type:", os.type());

//Get the network interfaces
console.log("Network Interfaces:", os.networkInterfaces());
console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());

//Get the endianness of the CPU
console.log("Endianness:", os.endianness());

//Get the temporary directory
console.log("Temporary Directory:", os.tmpdir());
console.log("Platform Info:", os.platform());

//Get the user information
console.log("User Info:", os.userInfo());
console.log("Architecture Info:", os.arch());
