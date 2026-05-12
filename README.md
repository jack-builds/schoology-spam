# Schoology Discussion Helper

A Chrome extension that enhances Schoology discussion pages with tools for faster navigation and streamlined posting workflows.

---

## Features

- One-click “Add Discussion” automation shortcut
- Auto-filled title generation with counter support
- Hard limit on automated posts (safety cap: 500)
- Retry logic for more reliable form interactions
- Manual start/stop controls via floating UI
- Lightweight content script (no external dependencies)

---

## How It Works

The extension injects a content script into Schoology discussion pages and:

- Detects the “Add Discussion” button
- Opens the discussion creation form
- Fills in the title field automatically
- Submits the form through controlled user-triggered automation
- Tracks progress with an internal counter

A retry system helps ensure elements load properly before interaction.

---

## Installation (Developer Mode)

1. Clone or download the repo
2. Open Chrome and go to: chrome://extensions
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the project folder

---

## Usage

1. Navigate to your Schoology discussion page
2. Open the extension UI (floating panel)
3. Click **Start (500 max)** to begin automated posting
4. Use **Stop** at any time to halt execution

The system will automatically stop after 500 posts.

---

## Safety Features

- Maximum post limit enforced (500)
- Manual start/stop control
- Retry logic for failed element detection
- Randomized delays to prevent UI conflicts
- No background or hidden execution

---

## Tech Used

- JavaScript (Vanilla)
- Chrome Extensions Manifest V3
- DOM manipulation
- Schoology page structure targeting

---

## Notes

- This extension is designed for educational and personal workflow enhancement on Schoology.
- It relies on DOM selectors which may change if the platform updates its UI.
- Intended for manual, user-controlled execution only.

---

## 🧑‍💻 Author

Built as a personal browser automation project for exploring Chrome extension development and DOM interaction workflows.
