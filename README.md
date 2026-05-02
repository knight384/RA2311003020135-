# RA2311003020135-

# 📬 Notifications App (Frontend)

A production-style frontend application that displays, filters, and manages notifications with priority sorting, pagination, and seen/unseen tracking.

Built as part of a frontend evaluation project.

---

## 🚀 Features

- 📥 Fetch notifications from API
- 🔎 Filter by notification type (event, result, placement)
- 📄 Pagination support
- ⭐ Priority Inbox (sorted by importance)
- 👁 Seen / Unseen tracking using localStorage
- 🟢 Visual indicators for new notifications
- ⏱ Human-readable timestamps (e.g., "2 hours ago")
- 🎨 Clean UI with Material UI
- 📱 Responsive design (mobile + desktop)
- 📊 Logging middleware integration

---

## 🧠 Priority Logic

Notifications are sorted based on:

1. `placement` (highest priority)
2. `result`
3. `event` (lowest priority)

Within the same type → latest notifications appear first.

---

## 👀 Seen / Unseen Logic

- Clicking a notification marks it as **seen**
- Seen state is stored in `localStorage`
- Unseen notifications are highlighted with:
  - bold text
  - visual indicator (dot/badge)

---

## 🛠 Tech Stack

- React / Next.js
- Material UI
- JavaScript (ES6+)
- LocalStorage (state persistence)

---

## 📁 Project Structure
