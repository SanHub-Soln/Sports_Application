

```md
# 🏆 Sports Streaming Application (Frontend Demo)

A modern **sports streaming web application** built with **React** that demonstrates **authentication, protected video playback, favorites management, infinite scrolling, and section-based browsing** — **entirely without a backend server**.

This is a **frontend-only demo project**, designed to showcase clean UI/UX, realistic authentication flow, state management, and YouTube-inspired engagement patterns for sports OTT platforms.

---

## 🚀 Features Overview

### 🔐 Authentication (Login / Signup)
- Toggle between **Login** and **Signup**
- Signup requires name, email, and password
- Password visibility toggle
- Mock authentication using localStorage
- Fake JWT token and user data stored in `localStorage`
- Automatic redirect to home page after successful login/signup

### 🎥 Video Access Control (Auth Guard)
- **Non-logged-in users**: Can watch any video for **only 10 seconds**
- After 10 seconds → overlay popup: *"Login to continue watching"*
- **Logged-in users**: Unlimited full video playback
- Mimics real-world engagement triggers (like YouTube)

### ❤️ Favorites System
- Click ❤️ to add/remove videos from favorites
- Favorites are saved **per user** in localStorage
- Dedicated **Favorites tab** shows only liked videos
- Persists across sessions

### 📜 Browsing & Discovery
- **Tabs**: All • Live • Leagues • Favorites
- **Sections** by sport: Popular, Live, Cricket, Football, Basketball, Badminton, Tennis, Chess
- Horizontal carousels with **"Show More"** → expands to full infinite scroll section
- **Infinite vertical scrolling** (no pagination)
- Search and filter functionality
- Responsive grid layout

### 📄 Pages
- `/auth` → Login/Signup page
- `/` → Home (hero section, about, feature showcase)
- `/matches` → Main video browsing and playback page
- `/contact` → Creative 404-style contact/showcase page

---

## 🗂️ Project File Structure

```
src/
├── api/
│   └── authApi.js      # Mock login/register with fake JWT
|   assets  
|   └── hero_img
├── components/
│   ├── Auth.jsx            # Login/Signup form
│   ├── Footer.jsx     # HTML5 player with auth guard logic
│   ├── Header.jsx       # Individual video thumbnail card
│   ├── ThreeDCaraousel.jsx      # Horizontal carousel row
│   └── ScrollVideo.jsx                 # Other UI components
├── data/
│   ├── Users.js            # localStorage helpers for users & favorites
│   ├── userdata.js         # User utilities (get/update favorites)
│   └── seed.js             # Static seeded sports video data
├── pages/
│   ├── Auth.jsx
│   ├── Home.jsx
│   ├── Matches.jsx
│   └── Contact.jsx
├── App.jsx
├── main.jsx
└── index.css
```


## 🧠 Data & Storage Architecture

- All user data stored in **browser `localStorage`**
- Users stored under key `"users_db"` as array of:
```js
{
  name,
  email,
  password: btoa(password),    // Base64 "hash" (demo only)
  favorites: []                // Array of video IDs
}
```
- Video content comes from static `seed.js` and matches page itself one dummy video and poster or tumbnail (no external API calls)
- Favorites updated via utility functions in `Users.js`

---

## ⚠️ Important Notes About Media Assets

**The images (posters/thumbnails) and videos used in this project are for demonstration purposes only.**

- They are **referenced from external public sources** (YouTube embeds, placeholder images, etc.)
- **No ownership or affiliation** with any real sports league, team, or content
- Used purely as **visual references** to simulate a real sports streaming platform
- In a production app, all media would be properly licensed or hosted

---

## 🔐 Security Notes (Critical)

⚠️ **This is a demo/Interview Task project only**

- Passwords are "hashed" using `btoa()` → **Base64 encoding** (easily reversible)
- No salting, bcrypt, or proper hashing
- Fake JWT tokens (Base64-encoded JSON with email + timestamp)
- No server-side validation or encryption
- **Do not use this authentication system in production**

---

## 🛠️ Tech Stack

- **React** (Vite)
- **React Router DOM** v6
- **Tailwind CSS**
- **Heroicons**
- **HTML5 Video API**
- **localStorage** for persistence

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/SanHub-Soln/Sports_Application.git
cd sports-streaming-demo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the app
```bash
npm run dev
```

Open `http://localhost:5173` (or your Vite port)

---
### 1. See in live 
playcode: 
---

## 📡 Mock API Endpoints (Frontend Only)

| Method | Endpoint            | Description               |
|--------|---------------------|---------------------------|
| POST   | `/auth/register`    | Register new user         |
| POST   | `/auth/login`       | Login existing user       |

→ Handled entirely in `authApi.js` (no real server)

---

## 🎯 Key Highlights

- Fully functional auth flow without a backend
- Realistic 10-second video restriction for guests
- YouTube-style UI/UX patterns
- Infinite scrolling + expandable sections
- Per-user favorites with persistence
- Clean, responsive, modern design
- Incremental feature-rich commit history

---

## 📜 License

This project is for **educational and portfolio demonstration purposes only**.  
Feel free to fork, modify, or use as inspiration!


⭐ **Star the repo if you found this helpful!**
```
