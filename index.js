const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotEnv = require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
const url = process.env.DB;

app.post("/data", async (req, res) => {
    let client = await mongodb.connect(url);
    let db = client.db("patients");
    let data = await db.collection("patients").insertMany(req.body);
    res.json({
        data: data.insertedCount,
        status: "Ok",
    });
});

app.get("/room/:id", async (req, res) => {
    let client = await mongodb.connect(url);
    let db = client.db("patients");
    let data = await db
        .collection("patients")
        .find({ room: req.params.id })
        .sort({ time: 1 })
        .toArray();
    res.json({
        data: data,
        status: "OK",
    });
});

app.listen(process.env.PORT || 3001, () => {
    console.log("Listening");
});
