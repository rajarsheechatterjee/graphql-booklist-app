const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("Connected to MongoDb"));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => console.log("Server is running on port 4000"));
