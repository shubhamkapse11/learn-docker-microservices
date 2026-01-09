const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
app.use(express.json());
// app.use(bodyParser.json());

app.get('/', (req , res)=>{
    res.send("User Service")
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
