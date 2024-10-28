import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors"; // Import the cors middleware
import StudentRoute from "./routes/StudentRoute.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;

// Middleware
// app.use(cors({ origin: 'http://localhost:3000' })); // Enable CORS for your frontend
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log("Database connection error:", error));

// API Routes
app.use("/students", StudentRoute);
app.use("/", UserRoute);

