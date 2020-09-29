import express from "express";
import logger from "morgan";
import createError from "http-errors";
import createHttpError from "http-errors";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import MyGraphQLSchema from "./model/graphqlSchema";

mongoose
  .connect(
    `mongodb+srv://organizationX:12345@organization.ykb9q.mongodb.net/graphql`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true, 
      useCreateIndex: true,
      useFindAndModify:false
    }
  )
  .then(() => console.log("connected too Database"))
  .catch((error) => 
    console.error("sorry could not connect to MongoDb.", error)
  );

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  })
);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createHttpError.HttpError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

});

export default app;
