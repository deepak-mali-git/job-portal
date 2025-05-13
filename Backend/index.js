import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
dotenv.config();
// console.log(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    return res.status(200).json({
        message:"message to the API",
        Timestamp: new Date().toISOString(),
        success: true,
    });
});

const corsOptions = {
    origin: "http://localhost:5121",
    credentials: true,
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

//2zjR5cSsji464B9i