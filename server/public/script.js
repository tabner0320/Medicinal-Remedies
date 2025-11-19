
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
  });
}

// Button to Load Remedies from API
document.getElementById("loadRemedies").addEventListener("click", fetchRemedies);




