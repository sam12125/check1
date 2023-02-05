const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const UserModel = require("./Models/User");
const bodyParser = require("body-parser");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());

const db = "mongodb+srv://sam01:9760888906@cluster0.e2ut4be.mongodb.net/formdata?retryWrites=true&w=majority";

//static file
 
// app.use(express.static(path.join(__dirname , '../frontend/build')))

// app.get("*",function(req,res){
//   res.sendFile(path.join(__dirname , "../frontend/build/index.html"))
// })

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.get("/", (req, res) => {
  res.write("hello");
  console.log(db);
  res.end("");
});

mongoose
  .connect(db, connectionParams)
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("server started");
  // console.log(database)
});

app.get("/read", (req, res) => {
  UserModel.find((err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      // console.log(data)
      return res.status(200).send(data);
    }
  });
});


app.post("/insert", (req, res) => {
  const userModel = new UserModel();
  (userModel.country = req.body.country), //to be inserted
    (userModel.state = req.body.state), //to be inserted
    (userModel.city = req.body.city),
    (userModel.carType = req.body.carType),
    (userModel.carModel = req.body.carModel)
  console.log("insert api", req.body); 
  userModel.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send("Inserted to db");
    }
  });
});

app.get("/read", (req, res) => {
  UserModel.find((err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      // console.log(data)
      return res.status(200).send(data);
    }
  });
});

app.delete("/delete", (req, res) => {
  const userModel = new UserModel();
  (userModel._id = req.query.id), console.log(req.query);
  UserModel.deleteOne({ _id: req.query.id }, (err, data) => {
    //entry to be deleted
    if (err) {
      return res.status(500).send(err);
    } else {
      // console.log(data)
      return res.status(200).send(data);
    }
  });
});
