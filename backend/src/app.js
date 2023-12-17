import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import bodyParser from "body-parser";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// routes declaration

app.use("/api/v1", router);

export default app;
