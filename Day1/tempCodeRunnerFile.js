Fetch API (Note: This code requires a browser or environment that supports Fetch API)
async function fetchUserData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');               
        const user = await response.json();
        console.log("User Data: ", user);
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
}

fetchUserData();  