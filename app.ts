import express from "express";
import { Application, Request, Response } from "express";
import expressLogger from "express-bunyan-logger";
import cors from "cors";
import config from "./config";
import router from "./routes";

const app: Application = express();

// Parsing Request Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using Express logger
app.use(
    expressLogger({
        excludes: [
            "headers",
            "req",
            "user-agent",
            "short-body",
            "http-version",
            "req-headers",
            "res-headers",
            "body",
            "res",
        ], // remove extra details from log
    })
);

// Enabling CORS
app.use(cors());

// Test route
app.get("/api/test", (req: Request, res: Response) => {
    res.status(200).send(`Blood Connect API Release ${config.get("version")}`);
});

// Redirecting requests to Routes
app.use("/api", router);

// Handling invalid, 404 requests
app.use((req: Request, res: Response) => {
    return res.status(404).send("Invalid route, Route not found");
});

export default app;