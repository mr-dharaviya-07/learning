const express = require('express');
const app = express();
const PORT = 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Load user data
const data = require("./users.json");
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
        return res.status(404).send({ message: "User does not exist" });
    }

    // Check password
    if (user.password === req.body.password) {
        return res.status(200).send({ message: "Login successful!" });
    } else {
        return res.status(401).send({ message: "Incorrect password" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
