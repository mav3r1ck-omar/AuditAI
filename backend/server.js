import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import auditRouter from "./routes/audit.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use("/api/audit", auditRouter);

app.get("/", (req, res) => {
    res.send("AuditAI Backend is running.");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});