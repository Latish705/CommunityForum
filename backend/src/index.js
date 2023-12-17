import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

console.log(process.env.PORT);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server started successfully at http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch(() => {
    console.log("Error connecting to DB");
  });
