function showRemedy(symptom) {
  const remedies = {
    "Headache": {
      text: "Try Ginger tea or Turmeric for anti-inflammatory effects.",
      image: "images/ginger.jpg"
    },
    "Cold": {
      text: "Elderberry syrup and Mullein tea can help relieve symptoms.",
      image: "images/elderberry.jpg"
    },
    "Digestive Issues": {
      text: "Ginger and Turmeric are excellent for digestion support.",
      image: "images/turmeric.jpg"
    }
  };

  const resultElement = document.getElementById("remedyResult");

  if (remedies[symptom]) {
    resultElement.innerHTML = `
      <p>${remedies[symptom].text}</p>
      <img src="${remedies[symptom].image}" 
           alt="${symptom} remedy" 
           style="max-width:200px; margin-top:10px;" />
    `;
  } else {
    resultElement.innerHTML = "<p>No remedy found.</p>";
  }
}

