document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");

  // Function to update button text
  function updateButtonText(isEnabled) {
    toggleButton.textContent = isEnabled
      ? "Disable Difficulty Hider"
      : "Enable Difficulty Hider";
  }

  // Function to save settings to chrome storage
  function saveSettings(isEnabled) {
    chrome.storage.local.set({ isEnabled });
  }

  // Function to load settings from chrome storage
  function loadSettings(callback) {
    chrome.storage.local.get("isEnabled", (data) => {
      callback(data.isEnabled !== undefined ? data.isEnabled : true);
    });
  }

  // Set the initial state based on stored value or default to enabled
  loadSettings((isEnabled) => {
    updateButtonText(isEnabled);

    // Apply initial state to the current page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: updateDifficultyVisibility,
        args: [isEnabled],
      });
    });
  });

  // Toggle the state when the button is clicked
  toggleButton.addEventListener("click", () => {
    loadSettings((isEnabled) => {
      const newIsEnabled = !isEnabled;
      saveSettings(newIsEnabled);
      updateButtonText(newIsEnabled);

      // Update the current tab immediately
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: updateDifficultyVisibility,
          args: [newIsEnabled],
        });
      });
    });
  });
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
