require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {
  EmployeeQueryType,
  EmployeeMutationType,
} = require("./schemas/Employee");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLSchema } = require("graphql");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const schema = new GraphQLSchema({
  query: EmployeeQueryType,
  mutation: EmployeeMutationType,
});

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000, () => console.log("Server Started"));
