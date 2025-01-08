const express = require('express');
const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load user data
const data = require("./user.json");
const users = data.users;

// Endpoint to get all users
app.get("/user", (req, res) => {
    res.send(users);
});

// Endpoint for login
app.post("/login", (req, res) => {
    // Find user by email
    const user = users.find(user => user.email === req.body.email);

    if (!user) {
        res.send("User does not exist" );
    }

    // Check password
    if (user.password === req.body.password) {
        console.log("Login successful!");
        res.send("Login successful!");
    } else {
         res.send({ message: "Incorrect password" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
