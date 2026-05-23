# BNYF NGO Website

A complete 7-page website for the Spandanaforchange NGO organization, built with HTML, CSS, and JavaScript.

## 📋 Project Structure

```
NGO/
├── index.html              # Home page with impact counters and programs
├── about.html              # About page with vision, mission, team
├── programs.html           # Detailed 3-program showcase
├── donate.html             # Donation page with Razorpay integration
├── volunteer.html          # Volunteer registration form
├── transparency.html       # Financial transparency and reports
├── contact.html            # Contact form and information
├── privacy.html            # Privacy Policy
├── terms.html              # Terms & Conditions
├── refund.html             # Refund Policy
│
├── css/
│   └── styles.css          # Complete styling using IDs (deep teal & warm orange)
│
├── js/
│   ├── shared.js           # Shared JavaScript utilities
│   └── backend.js          # Backend API handlers
│
└── README.md               # This file
```

## 🎨 Design System

- **Primary Color**: Deep Teal (#00796B)
- **Secondary Color**: Warm Orange (#FF9500)
- **Background**: White (#FFFFFF)
- **Text**: Dark Gray (#333333)
- **Styling**: Uses ID-based selectors (#id) instead of classes

## 📱 Features

### Home Page
- Hero section with call-to-action
- Animated impact counters (15000+ lives, 5000+ children, 3000+ women, 50 villages)
- 3 program preview cards with "Learn More" buttons
- Donation progress bar (₹32.5L / ₹50L)
- Testimonials section
- CTA banner for donations

### About Page
- Vision & Mission statements
- Founder's message
- NGO registration details (80G, FCRA approved)
- Milestone timeline (2020-2024)
- Leadership team section

### Programs Page
- 3 detailed programs:
  - **Education Support** - Scholarships, school supplies, digital literacy
  - **Women Empowerment** - Vocational training, microfinance, business support
  - **Community Health** - Medical camps, awareness, health insurance
- Each program includes:
  - Description and objectives
  - Beneficiary statistics
  - Annual budget
  - Budget breakdown chart
  - Gallery placeholders
  - Donation CTA buttons

### Donation Page
- Fixed donation amounts (₹500, ₹1000, ₹2500)
- Custom amount input
- Donor form (name, email, phone)
- Anonymous donation option
- Razorpay payment integration placeholder
- Thank-you confirmation message
- Tax benefit information (80G eligible)

### Volunteer Page
- Registration form with:
  - Skills dropdown (Education, Women, Health, Fundraising, Marketing, etc.)
  - Availability selection (Weekday, Weekend, Flexible)
  - Motivation text area
  - Professional experience section
- Benefits section
- FAQ section
- Confirmation message

### Transparency Page
- Commitment to transparency statement
- Financial overview (2023-24):
  - ₹50L raised, ₹42.5L utilized
  - 85% program to 15% admin ratio
- Expense breakdown chart by program
- Fund utilization breakdown (₹18L education, ₹12L women, ₹10L health, etc.)
- Annual report downloads (2023-24, 2022-23, Auditor's Report)
- Funds raised vs. utilized year-over-year comparison
- Auditor information and compliance status

### Contact Page
- Contact form with subject dropdown
- Contact information:
  - Email: hello@spandanaforchange.org
  - Phone: +91-78459-61234
  - Address: 123 Social Street, Hyderabad
  - Office hours
- Social media links
- Google Maps placeholder
- Department-specific contact emails
- Newsletter subscription option

### Legal Pages
- **Privacy Policy** - Data collection and usage
- **Terms & Conditions** - Donation and volunteer terms
- **Refund Policy** - Non-refundable policy with exceptions

## 🔧 Technical Details

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Responsive grid layouts, gradients, transitions
- **JavaScript (Vanilla)** - No frameworks, pure vanilla JS

### Responsive Design
- Mobile-first approach
- Sticky navigation header
- Breakpoints:
  - Desktop: 1200px+
  - Tablet: 768px+
  - Mobile: 480px+

### Features Implemented
- Animated impact counters using Intersection Observer
- Mobile menu toggle
- Form validation (email, phone)
- LocalStorage for data persistence
- Smooth scroll behavior
- Color transitions on hover
- Responsive grid layouts

### Backend (JavaScript)
- Backend class in `js/backend.js` handles:
  - Volunteer registration storage
  - Donation record management
  - Contact form submissions
  - Statistics and reporting
  - Data export (JSON/CSV)
  - Email template generation

## 📊 Data Storage

Currently uses **localStorage** for development/demo purposes. Data includes:
- Volunteer registrations with status tracking
- Donation records with transaction IDs
- Contact form submissions
- NGO statistics and settings

## 🚀 Getting Started

### Quick Start (No Server)
Simply open `index.html` in your browser. All pages are self-contained and work locally.

```bash
# Open in browser
open index.html  # macOS
start index.html # Windows
```

### With Live Server (Recommended)
```bash
# Install Python Live Server
npm install -g http-server

# Run from project directory
http-server

# Visit http://localhost:8080
```

Or use VS Code Live Server extension:
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## 📝 Form Handling

### Current Implementation
Forms store data in localStorage with these keys:
- `donations` - Donation records
- `volunteers` - Volunteer registrations
- `contact_submissions` - Contact form submissions

### To Review Submissions
Open browser console and run:
```javascript
// View all donations
JSON.parse(localStorage.getItem('donations'))

// View all volunteers
JSON.parse(localStorage.getItem('volunteers'))

// View all contacts
JSON.parse(localStorage.getItem('contact_submissions'))

// Export database
backend.exportData('json')
backend.exportData('csv')
```

## 🔐 Security Notes

This is a frontend-heavy implementation suitable for demo/development. For production:

1. **Replace localStorage with real database** (Firebase, MongoDB, PostgreSQL)
2. **Implement actual backend server** (Node.js/Express, Python/Flask, etc.)
3. **Add API authentication** (JWT tokens)
4. **Validate all inputs on server side**
5. **Implement real Razorpay integration** (replace placeholder)
6. **Add CSRF protection**
7. **Enable HTTPS only**
8. **Implement rate limiting** on form submissions
9. **Add email notifications** via SMTP

## 🎯 Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-teal: #00796B;
    --cta-orange: #FF9500;
    /* ... other colors ... */
}
```

### Content
- Edit text directly in HTML files
- Update contact information in footer and contact page
- Modify statistics on home and transparency pages

### Navigation
Update links in header navigation across all pages

## 📱 Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Limitations

1. **Razorpay Integration** - Placeholder only, needs real API key
2. **Google Maps** - Placeholder, needs actual embed code
3. **Email Sending** - No email backend (need nodemailer or similar)
4. **Image Galleries** - Using emoji placeholders, replace with actual images
5. **Data Persistence** - localStorage only (cleared on browser cache clear)
6. **File Downloads** - PDF downloads are mocked

## 🔄 Future Enhancements

- [ ] Real database integration
- [ ] Email notification system
- [ ] Admin dashboard
- [ ] Donor management system
- [ ] Volunteer scheduling
- [ ] Monthly report automation
- [ ] SMS notifications
- [ ] Multiple language support
- [ ] Payment gateway integration (Razorpay/PayPal)
- [ ] Analytics dashboard

## 📞 Support

For issues or questions:
- Email: hello@spandanaforchange.org
- Phone: +91-78459-61234
- Address: 123 Social Street, Hyderabad, Telangana 500001

## 📄 License

All content and code are proprietary to Spandanaforchange NGO.

---

**Last Updated**: January 2024
**Version**: 1.0
