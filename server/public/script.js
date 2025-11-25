
// Function for showing remedies based on symptom selection
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

// Listen for any symptom button clicks
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".symptom-btn");
  if (!btn) return;
  const symptom = btn.dataset.symptom;
  showRemedy(symptom);
});

// Fetch remedies from API
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

// Handle form submission to POST new remedy
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

  // Fade-in animation
  requestAnimationFrame(() => card.classList.add("show"));
});

}

let remediesVisible = false;

document.getElementById("loadRemedies").addEventListener("click", async () => {
  const container = document.getElementById("remedy-container");

  if (!remediesVisible) {
    await fetchRemedies();
    container.classList.add("visible");                   // <— show animation
    document.getElementById("loadRemedies").textContent = "Hide Remedies";
    remediesVisible = true;
  } else {
    container.classList.remove("visible");                // <— hide animation
    container.innerHTML = "";
    document.getElementById("loadRemedies").textContent = "Show All Remedies";
    remediesVisible = false;
  }
});






