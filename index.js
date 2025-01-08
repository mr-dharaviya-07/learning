

const express = require('express');

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    
    res.send("Welcome to the Express.js Tutorial")
});
app.get('/home', (req, res) => {

    res.send("<h1>Welcome to Home page</h1>")
});
app.get('/login', (req, res) => {

    res.send("This is login Page")
});

app.listen(PORT,()=>{

    console.log("Server is running on port 4000");
    
})

