

const express = require('express');

const app = express();

const cors = require('cors');

const PORT = 4000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const data = require("./users.json");

const users = data.users;
app.get("/user", (req, res) => {
    res.send(users);
})


app.post("/login", (req, res) => {

        const { email, password } = req.body

        const user = users.find((user) => {
            return user.email === email;
        })

        if (!user) {
            res.send({message: "Invalid Email and Password"});

        }
        else if (user.password === password) {
            res.send({userName: user.name});
        }
        else{
            res.send({ message: "Invalid Email and Password"});
        }
    }
)



app.listen(PORT, () => {

    console.log("Server running on 4000");

})