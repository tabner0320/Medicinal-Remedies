
// Function for showing remedies based on symptom selection
function showRemedy(symptom) {
  const remedyResult = document.getElementById("remedyResult");
  const digestiveInfo = document.getElementById("digestive-info");

  // Reset animation each time
  digestiveInfo.classList.remove("fade-in");

  // Hide the digestive section by default
  digestiveInfo.classList.add("hidden");

  // Display result text
  if (symptom === "Headache") {
    remedyResult.textContent = "Try peppermint or lavender for headache relief.";

  } else if (symptom === "Cold") {
    remedyResult.textContent = "Elderberry, echinacea, and ginger are great for colds.";

  } else if (symptom === "Digestive Issues") {
    remedyResult.textContent = "";

    digestiveInfo.classList.remove("hidden"); // Show section
    digestiveInfo.classList.add("fade-in");   // Add fade-in animation

  } else {
    remedyResult.textContent = "";
  }
}


// Fetch remedies from API
async function fetchRemedies() {
  try {
    const response = await fetch("http://localhost:3000/api/remedies");
    
    if (!response.ok) {
      throw new Error("Failed to load remedies");
    }

    const remedies = await response.json();
    displayRemedies(remedies);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Handle form submission to POST new remedy
document.getElementById("remedyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newRemedy = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    type: document.getElementById("type").value,
    years_used: parseInt(document.getElementById("years").value),
  };

  try {
    const response = await fetch("http://localhost:3000/api/remedies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRemedy),
    });

    if (response.ok) {
      alert("New remedy added successfully!");
      document.getElementById("remedyForm").reset();
      fetchRemedies(); // refresh list
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
    document.getElementById("loadRemedies").textContent = "Hide Remedies";
    remediesVisible = true;
  } else {
    container.innerHTML = "";
    document.getElementById("loadRemedies").textContent = "Show All Remedies";
    remediesVisible = false;
  }
});






