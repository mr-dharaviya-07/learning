const express = require('express');
const app = express();
const PORT = 4000;

const data = require('./product.json');

// const Data = JSON.parse(data); 
const products = data.products;

// app.use((req, res, next) => {
//     req.dataArray = products; 
//     next();
//   });

app.get('/', function (req, res) {

    //-----------filter method-------------
   
         const price =  products.filter((items) => {    
            return items.Price > 1000;
        })

        res.send(price);


    //-----------------forEach method----------------


    let productName = [];

      products.forEach((item) => {
        productName.push(item.name);
      });

      res.send(productName);


    //-----------map method----------------

    const name = products.map((item) => {
        return item.name;
      });
      res.send(name);


    //-----------reduce method----------------

    let total = products.reduce((acc, item) => {
        return acc + item.Price;
      }, 0);

      console.log(total);
      res.json(total);


});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
