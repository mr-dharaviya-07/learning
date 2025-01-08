

const express = require('express');

const app = express();

const PORT = 4000;

const data = require('./users.json');

const users = data.users;
console.log(users);

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));



//get all data
app.get('/user',(req,res) =>{

    res.send(users);

})


//get data by id
app.get('/user/:id',(req,res)=>{

    const id = req.params.id;

    const user = users.find(user => user.id == id);
    // const userName =  user.map((user)=>(user.name));
    // console.log(user)
    res.send(`User Name is : ${user.name}`);
});


app.post("/user", (req,res)=>{

    const newUser = {
        "id": users.length + 1,
        "name": req.body.name
      };
    
      console.log(newUser);
      users.push(newUser);
      res.send(newUser);
});


app.put("/user/:id",(req,res)=>{

    const id = req.params.id;

    const user = users.find(user => user.id == id);
    // console.log(user);
    user.name = req.body.name;

    console.log(user);
    res.send(user);
})


app.delete('/user/:id', (req, res) => {

    const id = req.params.id;
    const userIndex = users.findIndex(u => u.id === id);

    users.splice(userIndex, 1);
    res.send("User deleted successfully");
    console.log("User Deleted Successfully");
  });





app.listen(PORT,()=>{
    console.log('Server is running on port 4000');
})

