
// Function for showing remedies based on symptom selection
let symptomChart = null;

function showRemedy(symptom) {
  const remedyResult = document.getElementById("remedyResult");
  const digestiveInfo = document.getElementById("digestive-info");

  digestiveInfo.classList.remove("fade-in");
  digestiveInfo.classList.add("hidden");

  if (symptom === "Headache") {
    remedyResult.textContent = "Try peppermint or lavender for headache relief.";
  } else if (symptom === "Cold") {
    remedyResult.textContent = "Elderberry, echinacea, and ginger are great for colds.";
  } else if (symptom === "Digestive Issues") {
    remedyResult.textContent = "";
    digestiveInfo.classList.remove("hidden");
    digestiveInfo.classList.add("fade-in");
  } else {
    remedyResult.textContent = "";
  }
}


document.addEventListener("click", (e) => {
  const btn = e.target.closest(".symptom-btn");
  if (!btn) return;
  const symptom = btn.dataset.symptom;
  showRemedy(symptom);

  
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event: "symptom_click", payload: { symptom } })
  }).catch(() => {});
});


async function fetchRemedies() {
  try {
    console.log("Fetching remedies…");
    const response = await fetch("/api/remedies"); // use relative URL
    if (!response.ok) throw new Error("Failed to load remedies");

    const remedies = await response.json();
    console.log("Fetched remedies:", remedies);
    displayRemedies(remedies);
  } catch (error) {
    console.error("Error:", error);
    const container = document.getElementById("remedy-container");
    container.classList.add("visible");
    container.innerHTML = `<p style="color:#b00020;">${error.message}</p>`;
  }
}


document.getElementById("remedyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newRemedy = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    type: document.getElementById("type").value,
    years_used: parseInt(document.getElementById("years").value, 10),
  };

  try {
    const response = await fetch("/api/remedies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRemedy),
    });

    if (response.ok) {
      alert("New remedy added successfully!");
      document.getElementById("remedyForm").reset();
      await fetchRemedies(); // refresh list
      await loadStats();

    
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "remedy_added",
          payload: { name: newRemedy.name, type: newRemedy.type }
        })
      }).catch(() => {});
    } else {
      alert("Failed to add remedy.");
    }
  } catch (error) {
    console.error("Error adding remedy:", error);
  }
}); 


// Display remedy cards dynamically
function displayRemedies(remedies) {
  const container = document.getElementById("remedy-container");
  container.innerHTML = ""; // Clear old content

  remedies.forEach(remedy => {
    const card = document.createElement("div");
    card.classList.add("remedy-card");
    card.innerHTML = `
      <h2>${remedy.name}</h2>
      <p><strong>Description:</strong> ${remedy.description}</p>
      <p><strong>Type:</strong> ${remedy.type}</p>
      <p><strong>Years Used:</strong> ${remedy.years_used} years</p>
    `;
    container.appendChild(card);

    
    requestAnimationFrame(() => card.classList.add("show"));
  });
}

let remediesVisible = false;

document.getElementById("loadRemedies").addEventListener("click", async () => {
  const container = document.getElementById("remedy-container");

  if (!remediesVisible) {
    await fetchRemedies();
    container.classList.add("visible"); // show animation
    document.getElementById("loadRemedies").textContent = "Hide Remedies";
    remediesVisible = true;
  } else {
    container.classList.remove("visible"); // hide animation
    container.innerHTML = "";
    document.getElementById("loadRemedies").textContent = "Show All Remedies";
    remediesVisible = false;
  }
});




async function loadStats() {
  try {
    const res = await fetch("/api/stats");
    const stats = await res.json();

    
    const cards = document.getElementById("stats-cards");
    cards.innerHTML = `
      <div class="remedy-card show"><strong>Total events:</strong> ${stats.totals.events}</div>
      <div class="remedy-card show"><strong>Symptom clicks:</strong> ${stats.totals.symptomClicks}</div>
      <div class="remedy-card show"><strong>Remedies added:</strong> ${stats.totals.remedyAdds}</div>
    `;

    
    const labels = stats.topSymptoms.map(s => s.symptom);
    const data = stats.topSymptoms.map(s => s.count);
    const ctx = document.getElementById("symptomChart").getContext("2d");

    if (!symptomChart) {
      // create once
      // eslint-disable-next-line no-undef
      symptomChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{ label: "Symptom Clicks", data }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
        },
      });
    } else {
      // update existing chart
      symptomChart.data.labels = labels;
      symptomChart.data.datasets[0].data = data;
      symptomChart.update();
    }
  } catch (err) {
    console.error("Stats error:", err);
  }
}



document.addEventListener("DOMContentLoaded", loadStats);
document.getElementById("refreshStats")?.addEventListener("click", loadStats);








