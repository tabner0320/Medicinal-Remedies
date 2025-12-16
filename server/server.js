const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));

const dataPath = path.join(__dirname, "data.json");


function readData() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}


function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}


app.get("/api/remedies", (req, res) => {
  const data = readData();
  res.json(data);
});


app.get("/api/remedies/:id", (req, res) => {
  const data = readData();
  const remedy = data.find(r => r.id === parseInt(req.params.id));
  if (remedy) res.json(remedy);
  else res.status(404).json({ message: "Remedy not found" });
});


app.post("/api/remedies", (req, res) => {
  const data = readData();
  const newRemedy = req.body;
  newRemedy.id = data.length > 0 ? data[data.length - 1].id + 1 : 1;
  data.push(newRemedy);
  writeData(data);
  res.status(201).json(newRemedy);
});



const METRICS_PATH = path.join(__dirname, "metrics.json");

function readMetrics() {
  try {
    return JSON.parse(fs.readFileSync(METRICS_PATH, "utf8"));
  } catch {
    return { events: [] };
  }
}

function writeMetrics(data) {
  fs.writeFileSync(METRICS_PATH, JSON.stringify(data, null, 2));
}


app.post("/api/track", (req, res) => {
  const { event, payload } = req.body || {};
  if (!event) return res.status(400).json({ message: "Missing event name" });

  const metrics = readMetrics();
  metrics.events.push({
    event,
    payload: payload || {},
    ts: new Date().toISOString()
  });
  writeMetrics(metrics);
  res.json({ ok: true });
});


app.get("/api/stats", (req, res) => {
  const { events } = readMetrics();

  const symptomCounts = {};
  const typeCounts = {};

  for (const e of events) {
    if (e.event === "symptom_click" && e?.payload?.symptom) {
      const s = e.payload.symptom;
      symptomCounts[s] = (symptomCounts[s] || 0) + 1;
    }
    if (e.event === "remedy_added" && e?.payload?.type) {
      const t = e.payload.type;
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    }
  }

  const topSymptoms = Object.entries(symptomCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([symptom, count]) => ({ symptom, count }));

  const types = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count }));

  res.json({
    totals: {
      events: events.length,
      symptomClicks: Object.values(symptomCounts).reduce((a, b) => a + b, 0),
      remedyAdds: Object.values(typeCounts).reduce((a, b) => a + b, 0)
    },
    topSymptoms,
    types
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
