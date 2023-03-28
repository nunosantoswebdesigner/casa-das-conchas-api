import express from "express";
import config from "./config.js";
import morgan from "morgan";
import cors from "cors";
import shellRoute from "./routes/shell.routes.js";
import "./db.js";

const app = express();

app.set("port", config.PORT);
app.use(morgan("dev"));
app.use(cors("*"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api", [shellRoute]);

export default app;