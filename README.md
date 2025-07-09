# Smart-ChromeExtension
 Smart Chrome Tab Cleaner (LRU Cache Based)
 
A lightweight Chrome Extension built using HTML + JavaScript, that automatically closes unused tabs using the Least Recently Used (LRU) Cache principle — just like how operating systems manage memory!

---

🧠 What It Does

This extension tracks your tab activity and automatically closes the least recently used tabs when a predefined limit is crossed. It's perfect for users who often leave too many tabs open and forget to close them.

---

🔍 LRU Cache Logic Explained

- Each time you click/switch to a tab, it is marked as recently used.
- Tabs are stored in an internal list based on their usage order (most recent at the end).
- User can decide the Max-limit
- When the number of tabs exceeds the threshold, the tab at the front of the list (i.e., least recently used) is automatically closed.
- This mimics the behavior of an LRU Cache, ensuring only the most recently active tabs remain open.

---

🧩 Features

- ✅ Uses pure HTML + JavaScript
- ✅ Auto-closes unused tabs using LRU strategy
- ✅ Chrome Extension ready
- ✅ Configurable tab limit (can be modified in the code)
- ✅ Lightweight and non-intrusive

---

🧱 Tech Stack

- HTML
-JS
-LRU concept
