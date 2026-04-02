# 🎧 Spotify Clone (HTML, CSS, JavaScript)

A fully functional **Spotify-inspired music player** built using pure **HTML, CSS, and JavaScript**.  
This project demonstrates real-world frontend development concepts like dynamic content loading, audio playback handling, and interactive UI design.

---

## ✨ Features

- 🎵 Dynamic song loading from local folders  
- ▶️ Play / Pause / Next / Previous controls  
- ⏱ Real-time song duration & progress tracking  
- 🎚 Interactive seek bar  
- 🔊 Volume control  
- 🔍 Search functionality for songs  
- 🎨 Clean and responsive user interface  

---

## 🛠 Tech Stack

- HTML5  
- CSS3  
- JavaScript (Vanilla JS)  

---

## ⚙️ How It Works

The application dynamically fetches songs and images from local directories using the **Fetch API**, then renders them into the UI.

```js
let x = await fetch("/music/");
let y = await x.text();
```

This project will NOT work if opened directly using file:// protocol.
📚 What I Learned
1.DOM manipulation and dynamic UI rendering
2.Handling asynchronous operations using async/await
3.Working with the JavaScript Audio API
4.Managing UI state using events
5.Understanding browser security limitations
