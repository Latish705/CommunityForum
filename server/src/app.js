import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import featureRouter from "./routes/featureRoutes.js";
import bodyParser from "body-parser";
// import corsOption from "./config/CORSoptions.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// routes declaration

app.use("/api/v1", authRouter);
//s
app.use("/api/v1/user", featureRouter);

export default app;
