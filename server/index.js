const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5000;
const MONGO_URL = "mongodb://127.0.0.1:27017/vehicle";
const userRoutess =  require("./routes/user");

const app = express();

//app.use(express.json());
app.use(cors());
app.use(express.json())
app.use("/api/auth", userRoutess);



mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    console.log("DB Connetion Successfull");
}).catch((er) => {
    console.log(err.message);
})

const server = app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
