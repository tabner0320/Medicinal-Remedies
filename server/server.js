const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ NEW: serve files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));


const dataPath = path.join(__dirname, "data.json");

// READ data from data.json
function readData() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// WRITE data to data.json
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// ✅ GET ALL Remedies
app.get("/api/remedies", (req, res) => {
  const data = readData();
  res.json(data);
});

// ✅ GET ONE Remedy by ID
app.get("/api/remedies/:id", (req, res) => {
  const data = readData();
  const remedy = data.find(r => r.id === parseInt(req.params.id));
  if (remedy) res.json(remedy);
  else res.status(404).json({ message: "Remedy not found" });
});

// ✅ POST NEW Remedy
app.post("/api/remedies", (req, res) => {
  const data = readData();
  const newRemedy = req.body;
  newRemedy.id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  data.push(newRemedy);
  writeData(data);
  res.status(201).json(newRemedy);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
