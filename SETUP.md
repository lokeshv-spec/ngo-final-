# 🚀 Quick Start Guide - Spandanaforchange Website

## ⚡ Fastest Way to View the Website

### Option 1: Open in Browser Directly (No Setup Required)
1. Navigate to the `c:\NGO` folder
2. Double-click `index.html`
3. The website will open in your default browser

**That's it!** All pages work immediately. Just click the navigation links.

---

## 🖥️ Option 2: Use Live Server (Recommended)

### With Python (if installed):
```bash
cd c:\NGO
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### With Node.js:
```bash
cd c:\NGO
npx http-server
```
Then visit: `http://localhost:8080`

---

## 🛠️ Option 3: Run Node.js Server

### Installation:
```bash
cd c:\NGO
npm install
```

### Start Server:
```bash
npm start
```

Then visit: `http://localhost:3000`

---

## 📱 Accessing Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/index.html` | Hero, impact counters, programs overview |
| About | `/about.html` | Vision, mission, team, timeline |
| Programs | `/programs.html` | Detailed 3-program showcase |
| Donate | `/donate.html` | Donation form with Razorpay placeholder |
| Volunteer | `/volunteer.html` | Volunteer registration |
| Transparency | `/transparency.html` | Financial reports and stats |
| Contact | `/contact.html` | Contact form and info |
| Admin | `/admin.html` | Data management dashboard |

---

## 🎨 Design Highlights

- **Primary Color**: Deep Teal (#00796B)
- **CTA Color**: Warm Orange (#FF9500)
- **Uses IDs** instead of classes for all styling
- **Responsive** - Works on mobile, tablet, desktop
- **No Dependencies** - Pure HTML/CSS/JavaScript

---

## 💾 Data Storage

All form submissions are saved in browser's localStorage:
- **Donations**: `localStorage.getItem('donations')`
- **Volunteers**: `localStorage.getItem('volunteers')`
- **Contacts**: `localStorage.getItem('contact_submissions')`

### View Data in Console:
```javascript
// Open browser Dev Tools (F12)
// Type in console:
JSON.parse(localStorage.getItem('donations'))
JSON.parse(localStorage.getItem('volunteers'))
JSON.parse(localStorage.getItem('contact_submissions'))
```

---

## 🔍 Admin Dashboard

Access admin panel at `/admin.html` to:
- View all volunteers, donations, contacts
- See statistics and metrics
- Export data as JSON or CSV
- Manage data

---

## 📋 Features Summary

✅ **7 Complete Pages**
- Home, About, Programs, Donation, Volunteer, Transparency, Contact

✅ **Responsive Design**
- Mobile-first, tablet-friendly, desktop optimized

✅ **Interactive Elements**
- Animated counters, donation progress bar, form validation

✅ **Forms with Validation**
- Email validation, phone number validation
- Form submission feedback

✅ **Sticky Navigation**
- Always-visible header with page links

✅ **Professional Footer**
- Links, social media, legal pages

✅ **Backend-Ready**
- Backend API structure prepared for real database integration

---

## 🔧 Customization

### Change Colors:
Edit `css/styles.css`:
```css
:root {
    --primary-teal: #00796B;      /* Change primary color */
    --cta-orange: #FF9500;        /* Change CTA button color */
}
```

### Update Contact Info:
Search for these email addresses and replace:
- `hello@spandanaforchange.org`
- `support@spandanaforchange.org`
- `donations@spandanaforchange.org`

### Update Statistics:
Edit counters in `index.html`:
```html
<div class="counter-number" data-target="15000">0</div>  <!-- Change 15000 -->
```

---

## ⚠️ Important Notes

1. **Forms use localStorage** - Data is stored locally, not on a server
2. **Razorpay is a placeholder** - Replace with actual Razorpay integration
3. **Google Maps is a placeholder** - Add actual embed code
4. **Images are emoji placeholders** - Replace with actual images/assets

---

## 📞 Support

For issues or questions:
- Email: hello@spandanaforchange.org
- Phone: +91-78459-61234
- Check README.md for detailed documentation

---

## 📁 File Structure

```
NGO/
├── index.html              # Home page
├── about.html              # About page
├── programs.html           # Programs page
├── donate.html             # Donation page
├── volunteer.html          # Volunteer page
├── transparency.html       # Transparency page
├── contact.html            # Contact page
├── admin.html              # Admin dashboard
├── privacy.html            # Privacy Policy
├── terms.html              # Terms & Conditions
├── refund.html             # Refund Policy
│
├── css/
│   └── styles.css          # All styling
│
├── js/
│   ├── shared.js           # Shared utilities
│   └── backend.js          # Backend API
│
├── package.json            # NPM config
├── server.js               # Node.js server
├── README.md               # Full documentation
└── SETUP.md                # This file
```

---

**Happy exploring! 🌟**
