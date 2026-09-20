# For Nandini ♡ — Proposal Website

A minimalist, heartfelt, romantic proposal website crafted personally for Nandini.

## 🌟 Features
- **Warm, Handwritten Aesthetic**: Soft cream and blush tones, elegant serif typography, hand-drawn SVG heart strokes, and personal letter card.
- **Cute Preloader (~2.5s)**: Self-drawing SVG heart, warm intro text ("Just something I made for you…", "Nandini ♡"), and a gentle heartbeat.
- **Section Flow**:
  1. **Hero**: Gentle opening note with smooth forward transition.
  2. **The Letter**: Personal message with handwritten signature.
  3. **The Question**: Highlight section with a single "Yes, I will ♡" button (respectful, zero manipulative tricks).
  4. **Celebration**: Soft floating pastel heart/paper particles canvas, subtle warm ambient background shift, and affirmation text.
  5. **Final Message & WhatsApp Link**: Seamless click-to-chat button directing to your WhatsApp with a pre-filled response message.
- **Optional Background Song**: Minimalist pill in top corner, starts paused/muted (respects user interaction).
- **Mobile-First & Ultra-Lightweight**: Zero external JS dependencies or heavy build steps.

---

## ⚙️ How to Configure

All texts, names, and phone numbers are located in **`config.js`**:

1. Open `config.js`.
2. Find `whatsappNumber: "YOUR_WHATSAPP_NUMBER"`.
3. Replace with your actual international phone number **without** the `+` or spaces.
   - **India (+91)**: `"919876543210"`
   - **US (+1)**: `"1234567890"`
   - **UK (+44)**: `"447123456789"`
4. You can also customize the message in `letter.paragraphs` or `whatsappMessage` anytime.

---

## 🚀 How to Run Locally

### Option 1: Double Click
Simply double-click `index.html` to open it directly in any browser (Chrome, Safari, Edge, Firefox).

### Option 2: Local HTTP Server (Python)
In terminal inside this directory:
```bash
python3 -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## 🌐 How to Share with Nandini

You can publish this for free in 1 minute:
- **Netlify Drop**: Drag and drop this folder onto [app.netlify.com/drop](https://app.netlify.com/drop) to get a live URL instantly.
- **Vercel**: Run `npx vercel` or drag folder to Vercel dashboard.
- **GitHub Pages**: Push this directory to a GitHub repository and enable Pages in settings.
