

const express = require('express');

const app = express();

const cors = require('cors');

const PORT = 4000;

app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

const data = require("./users.json");

const users = data.users;
app.get("/user", (req, res) => {
    res.send(users);
})


app.post("/login", (req, res) => {

        const { email, password } = req.body

        console.log(email);
        console.log(password);
        const user = users.find((user) => {
            return user.email === email;
        })

        if (!user) {
            res.send({message: "User Does not Excied.."});

        }

        if (user.password === password) {
            console.log("login Successfully....");
            res.send({ message: "login Successfully...."});
        }else{
            res.send({ message: "Invalid Password"});
        }
    }
)



app.listen(PORT, () => {

    console.log("Server running on 4000");

})