const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;
app.use(express.json());
// app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/user-service';
mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}); 

const User = mongoose.model("User", userSchema);
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }
    const user = await User.create({ name, email, password });
    const withoutPassword = user.toObject();
    delete withoutPassword.password;
    // const withoutPassword = user.select("-password");
    res.status(201).json(withoutPassword);
});

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

app.get('/', (req , res)=>{
    res.json("User Service")
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
