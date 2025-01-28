

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
app.get("/user/:id", (req, res) => {

    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)

    res.send(user);

})



app.post("/insert", (req, res) => {

    const data = req.body;

    console.log(data);

    res.send({ success: "Resigter successfully!" });

});
app.put("/update/:id", (req, res) => {

    const id = req.params.id;
    const data = req.body;

    console.log(id);
    console.log(data);

    res.send({ success: "Update successfully!" });

});


app.listen(PORT, () => {

    console.log("Server running on 4000");

})