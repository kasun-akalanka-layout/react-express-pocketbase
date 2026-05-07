import 'dotenv/config.js';
import express from "express";
import PocketBase from "pocketbase";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

const pb = new PocketBase(process.env.PB_URL || "http://pocketbase:8080");

app.post("/orders", async (req, res) => {
  const record = await pb.collection("orders").create({ status: "pending" });
  res.json(record);
});

app.patch("/orders/:id", async (req, res) => {
  const record = await pb.collection("orders").update(req.params.id, {
    status: req.body.status,
  });
  res.json(record);
});

app.delete("/orders/:id", async (req, res) => {
  await pb.collection("orders").delete(req.params.id);
  res.json({ success: true });
});

app.get("/orders", async (req, res) => {
  const list = await pb.collection("orders").getFullList();
  res.json(list);
});

app.listen(3001, () => console.log("Backend running on port 3001"));