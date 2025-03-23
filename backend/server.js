import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/emp/auth", authRoutes);
app.use("/emp/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
