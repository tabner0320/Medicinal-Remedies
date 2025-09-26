function showRemedy(symptom) {
  let result = "";

  switch (symptom) {
    case "Headache":
      result = "Try peppermint tea or ginger for relief.";
      break;
    case "Cold":
      result = "Elderberry syrup and ginger tea can help ease cold symptoms.";
      break;
    case "Digestive Issues":
      result = "Ginger and chamomile tea are great for digestion.";
      break;
    default:
      result = "No remedies found.";
  }

  document.getElementById("remedyResult").textContent = result;
}
