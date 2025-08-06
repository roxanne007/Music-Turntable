# Music Turntable

This project began as a native audio application developed with JUCE C++ designed for advanced DJ functionality and audio processing. To increase accessibility and showcase versatility I ported the core features to a web-based version using JavaScript and WaveSurfer.js.

The web version replicates dual DJ decks with interactive waveform visualizations drag and drop track loading playback controls such as play/pause loop and cue volume and pitch adjustment and the ability to upload local audio files all running entirely in the browser without installation.

This project demonstrates bridging native audio programming concepts to modern web technologies combining audio engineering with responsive UI and UX design.


---

## Features

- Dual DJ decks with waveform visualizations
- Drag-and-drop tracks from the music library onto decks
- Upload local audio files and add them to the library dynamically
- Play, pause, loop, and cue points for each deck
- Volume and pitch control for each deck
- Search and filter tracks by genre
- Crossfader control for smooth transitions between decks

---

## Demo

Live demo hosted on GitHub Pages:  
[https://roxanne007.github.io/Music-Turntable/](https://roxanne007.github.io/Music-Turntable/)

<img width="1492" height="819" alt="Screenshot 2025-08-06 at 7 38 21 pm" src="https://github.com/user-attachments/assets/c678f6d1-9c77-4e4c-9771-69edbf61d992" />
---

Navigate to the project directory:

bash
Copy
cd Music-Turntable/docs
Open index.html in your web browser:

You can open it directly or serve it with a local server for best results (e.g., with Live Server in VSCode).

# Usage
Drag and drop tracks from the music library to Deck A or Deck B.

Use the play/pause buttons to control playback.

Use loop and cue buttons to set loop points and cue positions.

Adjust volume and pitch sliders per deck.

Use the crossfader to blend audio between Deck A and Deck B.

Upload your own audio files via the upload button; they will be added to the music library automatically.

Use the search bar and genre filters to find tracks easily.

#  Folder Structure
csharp
Copy
Music-Turntable/
├── docs/
│   ├── index.html         # Main HTML page
│   ├── style.css          # Stylesheet
│   ├── script.js          # JavaScript functionality
│   ├── assets/            # Audio files folder
│       ├── chill-instrumental.mp3
│       ├── free-all-right-now.mp3
│       └── white-petals-by-keys-of-moon.mp3
└── README.md
# Dependencies
WaveSurfer.js (loaded via CDN)

# Contributing
Feel free to fork, submit issues, and pull requests! Suggestions for new features or improvements are welcome.


# License
This project is open-source and available under the MIT License.

# Contact
Created by Roxanne Bell.
Feel free to reach out for questions or collaboration.
