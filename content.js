// Function to load settings from chrome storage
function loadSettings(callback) {
  chrome.storage.local.get("isEnabled", (data) => {
    const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
    callback(isEnabled);
  });
}

// Function to update difficulty visibility
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

// Function to handle mutations
function handleMutations(mutations, observer) {
  loadSettings((isEnabled) => {
    updateDifficultyVisibility(isEnabled);
  });
}

// Function to initialize MutationObserver
function initializeMutationObserver() {
  const observer = new MutationObserver(handleMutations);
  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
}

// Function to initialize the script
function initialize() {
  // Initial load
  loadSettings((isEnabled) => {
    updateDifficultyVisibility(isEnabled);
  });

  // Set up MutationObserver
  initializeMutationObserver();

  // Listen for changes to chrome storage and update the page when settings change
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.isEnabled) {
      const isEnabled = changes.isEnabled.newValue;
      updateDifficultyVisibility(isEnabled);
    }
  });
}

// Wait for the DOM to be fully loaded before initializing
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
