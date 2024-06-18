import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import multer from "multer"; 
import bodyParser from "body-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// Increase payload size limits to 100MB
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());

// Configure multer for file uploads with size limit of 100MB
const upload = multer({
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB
    }
});

// Static files
app.use(express.static('public'));

// Routes import
import { router } from "./routes/user.routes.js";

// Routes declaration
app.use("/api/v1/users", router);

export { app };
