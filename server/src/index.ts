import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
/* Route Imports */
import projectRoutes from "./routes/projectRoutes";

/* configuration */
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

/*cors configuration */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ||
      "*" || ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "Post", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: true }));

/*Routs */
app.get("/", (req, res) => {
  res.send("this is home route");
});

app.use("/projects", projectRoutes);
app.use("/tasks");
app.use("/search");
app.use("/users");
app.use("teams");

/*server */
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
