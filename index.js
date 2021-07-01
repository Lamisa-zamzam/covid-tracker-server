require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const Patient = require("./models/patient");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json({ limit: "25000mb" }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("Connected to Mongo");
});

// Function call
app.post("/patients", (req, res) => {
    Patient.collection.insertMany(req.body);
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(process.env.PORT || 5000, () => {
    console.log("Listening to you, PORT 5000");
});
