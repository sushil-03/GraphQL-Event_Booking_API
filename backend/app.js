const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./graphql/schema");
const graphQlResolver = require("./graphql/resolvers");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");
const app = express();

app.use(bodyParser.json());
app.use(isAuth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true,
  })
);

// app.get("/", (req, res, next) => {
//   res.send("hee");
// });
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.6zpyora.mongodb.net/event-booking`
  )
  .then(() => {
    console.log("DB connecteed ");
    app.listen(3000);
  })
  .catch((error) => {
    console.log("SOmething went wrong in DB", error);
  });
