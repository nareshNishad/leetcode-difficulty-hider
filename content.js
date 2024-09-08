// Function to load settings from chrome storage
function loadSettings(callback) {
  chrome.storage.local.get("isEnabled", (data) => {
    console.log({ data });
    const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
    callback(isEnabled);
  });
}

// need to fix the page on load problem
loadSettings((isEnabled) => {
  updateDifficultyVisibility(isEnabled);
});

// This function will run in the context of the current page
function updateDifficultyVisibility(isEnabled) {
  console.log("update", isEnabled);
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

// Listen for changes to chrome storage and update the page when settings change
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.isEnabled) {
    const isEnabled = changes.isEnabled.newValue;
    updateDifficultyVisibility(isEnabled);
  }
});
