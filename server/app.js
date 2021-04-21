const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const Schema = require("./schema/schema");

const app = express();

app.use("/graphql", graphqlHTTP({ Schema }));

app.listen(4000, () => console.log("Server is running on port 4000"));
