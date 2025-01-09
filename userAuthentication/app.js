

const express = require('express');

const app = express();

const PORT = 4000;


// Middleware to parse JSON request bodies
app.use(express.json());
 
// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

const data = require("./users.json");

const users = data.users; 
app.get("/user",(req,res)=>{
    res.send(users);
})  



app.post("/login",(req,res)=>{


   const user = users.find((user)=>{
          return user.email === req.body.email;
    })

    if(!user){
        console.log("User Does not Excied..");

    }

    if(user.password === req.body.password){
        console.log("login Successfully....");
        res.send("login Successfully....");

    }

})



app.listen(PORT,()=>{

    console.log("Server running on 4000");
    
})