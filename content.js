chrome.storage.sync.get("isEnabled", (data) => {
  // Default to enabled if no setting is found
  const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
  updateDifficultyVisibility(isEnabled);
});

// This function will run in the context of the current page
function updateDifficultyVisibility(isEnabled) {
  const problemSetDifficultyElements = document.querySelectorAll(
    "div[role='cell'] span[class*='text-']"
  );
  const problemPageDifficultyElements = document.querySelectorAll(
    "div[class*='text-difficulty-']"
  );

  if (isEnabled) {
    // Hide difficulties
    problemSetDifficultyElements.forEach((element) => {
      element.style.display = "none";
    });
    problemPageDifficultyElements.forEach((element) => {
      element.style.display = "none";
    });
  } else {
    // Show difficulties
    problemSetDifficultyElements.forEach((element) => {
      element.style.display = "";
    });
    problemPageDifficultyElements.forEach((element) => {
      element.style.display = "";
    });
  }
}
