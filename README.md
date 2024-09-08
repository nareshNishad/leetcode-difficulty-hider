# LeetCode Difficulty Hider

This Chrome extension hides the difficulty level of problems on LeetCode and provides a toggle button to enable or disable this functionality.

## Features

- **Hide/Show Difficulty**: The extension automatically hides the difficulty levels of problems on LeetCode.
- **Toggle Button**: A popup button allows you to enable or disable the difficulty hider at any time.
- **Persistent Settings**: The extension remembers the last state (enabled/disabled) even after refreshing the page or closing the browser.
- **Real-time Updates**: Changes made via the popup button are applied in real-time on the current LeetCode tab.

## Installation

### 1. Clone or Download the Repository

Clone this repository to your local machine or download the zip file and extract it:

```bash
git clone https://github.com/nareshNishad/leetcode-difficulty-hider.git
```

### 2. Load the Extension into Chrome

1. Open **Chrome** and go to `chrome://extensions/`.
2. Enable **Developer Mode** (a toggle in the upper-right corner).
3. Click on the **Load unpacked** button and select the directory where you cloned/extracted the extension.

### 3. Using the Extension

- Once the extension is loaded, go to any problem page on LeetCode (e.g., https://leetcode.com/problems/split-linked-list-in-parts/description).
- By default, the difficulty level will be hidden.
- You can click on the extension icon to toggle the "Enable/Disable Difficulty Hider" feature.

## How It Works

- The extension hides the difficulty level elements on LeetCode by manipulating the DOM.
- It uses a combination of **content scripts** and **Chrome Storage API** to remember your preferences.
- **MutationObserver** ensures that dynamically loaded elements are correctly hidden.

### Key Files

- **`manifest.json`**: Configuration file for the Chrome extension.
- **`content.js`**: The script that interacts with the LeetCode page to hide/show difficulty levels.
- **`popup.js`**: The script that handles the toggle button and updates the extension settings.
- **`popup.html`**: The HTML file for the popup UI.
- **`icons/`**: The folder containing the extension icon images in different sizes.

## Future Enhancements

- **Customize UI**: Improve the popup design to make it more user-friendly.
- **More Options**: Add options to hide other elements on LeetCode (e.g., problem tags, solution votes).
- **Dark Mode Support**: Ensure the extension works seamlessly in both light and dark mode.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
