document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleButton");

  // Set the initial state based on stored value or default to enabled
  chrome.storage.sync.get("isEnabled", (data) => {
    const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
    toggleButton.textContent = isEnabled
      ? "Disable Difficulty Hider"
      : "Enable Difficulty Hider";
  });

  // Toggle the state when the button is clicked
  toggleButton.addEventListener("click", () => {
    chrome.storage.sync.get("isEnabled", (data) => {
      const isEnabled = data.isEnabled !== undefined ? data.isEnabled : true;
      const newIsEnabled = !isEnabled;

      chrome.storage.sync.set({ isEnabled: newIsEnabled }, () => {
        toggleButton.textContent = newIsEnabled
          ? "Disable Difficulty Hider"
          : "Enable Difficulty Hider";

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
