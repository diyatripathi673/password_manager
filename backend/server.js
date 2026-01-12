import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ ENV validation
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGO_URI || !DB_NAME) {
  console.error("❌ MONGO_URI or DB_NAME missing in .env file");
  process.exit(1);
}

// ✅ MongoDB connection
const client = new MongoClient(MONGO_URI);
let collection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    collection = db.collection("passwords");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
}

connectDB();

// ================= ROUTES =================

// GET all passwords
app.get("/", async (req, res) => {
  const data = await collection.find({}).toArray();
  res.json(data);
});

// SAVE password
app.post("/", async (req, res) => {
  await collection.insertOne(req.body);
  res.json({ success: true });
});

// DELETE password by id
app.delete("/", async (req, res) => {
  const { id } = req.body;
  await collection.deleteOne({ id });
  res.json({ success: true });
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
