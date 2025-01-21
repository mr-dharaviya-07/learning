

const express = require('express');

const app = express();
const fs = require('fs');
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
        res.send({ message: "Invalid Email and Password" });

    }
    else if (user.password === password) {
        res.send({ userName: user.name });
    }
    else {
        res.send({ message: "Invalid Email and Password" });
    }
}
)
app.post("/resigter", (req, res) => {

    const data = req.body;

    const filePath = "users.json";

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    }

    const existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    existingData.users.push(data);

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.send({message : "Resigter successfully!", userName: data.name});
    });


app.listen(PORT, () => {

    console.log("Server running on 4000");

})

