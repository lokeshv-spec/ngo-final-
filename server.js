// ========== SIMPLE NODE.JS EXPRESS SERVER ==========
// Run this with: node server.js
// Then visit http://localhost:3000

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Backend = require('./js/backend');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Initialize backend
const backend = new Backend();

// ========== ROUTES ==========

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, `${page}.html`);
    
    // Check if file exists
    const fs = require('fs');
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Page not found');
    }
});

// ========== API ENDPOINTS ==========

// VOLUNTEER ENDPOINTS
app.post('/api/volunteers', (req, res) => {
    try {
        const volunteer = backend.registerVolunteer(req.body);
        res.json({
            success: true,
            message: 'Volunteer registered successfully',
            data: volunteer
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/volunteers', (req, res) => {
    try {
        const volunteers = backend.getVolunteers();
        res.json({
            success: true,
            data: volunteers,
            count: volunteers.length
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/volunteers/:id', (req, res) => {
    try {
        const volunteer = backend.getVolunteerById(req.params.id);
        if (volunteer) {
            res.json({
                success: true,
                data: volunteer
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Volunteer not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.put('/api/volunteers/:id', (req, res) => {
    try {
        const volunteer = backend.updateVolunteer(req.params.id, req.body);
        if (volunteer) {
            res.json({
                success: true,
                message: 'Volunteer updated successfully',
                data: volunteer
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Volunteer not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// DONATION ENDPOINTS
app.post('/api/donations', (req, res) => {
    try {
        const donation = backend.recordDonation(req.body);
        res.json({
            success: true,
            message: 'Donation recorded successfully',
            data: donation
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/donations', (req, res) => {
    try {
        const donations = backend.getDonations();
        res.json({
            success: true,
            data: donations,
            count: donations.length
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/donations/stats', (req, res) => {
    try {
        const stats = backend.getDonationStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// CONTACT ENDPOINTS
app.post('/api/contacts', (req, res) => {
    try {
        const contact = backend.recordContactSubmission(req.body);
        res.json({
            success: true,
            message: 'Contact submission recorded successfully',
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/contacts', (req, res) => {
    try {
        const contacts = backend.getContactSubmissions();
        res.json({
            success: true,
            data: contacts,
            count: contacts.length
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.put('/api/contacts/:id/status', (req, res) => {
    try {
        const contact = backend.updateContactStatus(req.params.id, req.body.status);
        if (contact) {
            res.json({
                success: true,
                message: 'Contact status updated',
                data: contact
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// STATISTICS ENDPOINT
app.get('/api/statistics', (req, res) => {
    try {
        const stats = backend.getStatistics();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// DATA EXPORT ENDPOINTS
app.get('/api/export/json', (req, res) => {
    try {
        const data = backend.exportData('json');
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=ngo_database.json');
        res.send(data);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/export/csv', (req, res) => {
    try {
        const data = backend.exportData('csv');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=ngo_database.csv');
        res.send(data);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// HEALTH CHECK
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// ========== ERROR HANDLING ==========

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// ========== START SERVER ==========

app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════╗
    ║  Spandanaforchange NGO Website         ║
    ║  Server Running on http://localhost:${PORT}    ║
    ╚════════════════════════════════════════╝
    
    Available Routes:
    - GET  /              - Home page
    - POST /api/volunteers - Register volunteer
    - GET  /api/volunteers - Get all volunteers
    - POST /api/donations  - Record donation
    - GET  /api/donations  - Get all donations
    - POST /api/contacts   - Submit contact form
    - GET  /api/statistics - Get statistics
    - GET  /api/export/json - Export as JSON
    - GET  /api/export/csv - Export as CSV
    
    Press Ctrl+C to stop the server
    `);
});

module.exports = app;
