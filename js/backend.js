// ========== BACKEND API HANDLERS ==========
// This file handles all backend operations for the NGO website
// Currently uses localStorage for demo purposes
// In production, this would connect to a real database

class Backend {
    constructor() {
        this.initializeDatabase();
    }

    initializeDatabase() {
        if (!localStorage.getItem('ngo_database')) {
            localStorage.setItem('ngo_database', JSON.stringify({
                volunteers: [],
                donations: [],
                contacts: [],
                eventRegistrations: [],
                settings: {
                    totalRaised: 3250000,
                    totalBeneficiaries: 15000,
                    totalPrograms: 3
                }
            }));
        }
    }

    getDatabase() {
        const db = JSON.parse(localStorage.getItem('ngo_database') || '{}');
        db.volunteers = db.volunteers || [];
        db.donations = db.donations || [];
        db.contacts = db.contacts || [];
        db.eventRegistrations = db.eventRegistrations || [];
        db.settings = db.settings || {
            totalRaised: 3250000,
            totalBeneficiaries: 15000,
            totalPrograms: 3
        };
        return db;
    }

    saveDatabase(data) {
        localStorage.setItem('ngo_database', JSON.stringify(data));
    }

    // ========== VOLUNTEER MANAGEMENT ==========
    registerVolunteer(volunteerData) {
        const db = this.getDatabase();
        const volunteer = {
            id: Date.now().toString(),
            ...volunteerData,
            status: 'pending',
            registeredAt: new Date().toISOString()
        };
        db.volunteers.push(volunteer);
        this.saveDatabase(db);
        return volunteer;
    }

    getVolunteers() {
        const db = this.getDatabase();
        return db.volunteers || [];
    }

    getVolunteerById(id) {
        const volunteers = this.getVolunteers();
        return volunteers.find(v => v.id === id);
    }

    updateVolunteer(id, updates) {
        const db = this.getDatabase();
        const volunteerIndex = db.volunteers.findIndex(v => v.id === id);
        if (volunteerIndex !== -1) {
            db.volunteers[volunteerIndex] = {
                ...db.volunteers[volunteerIndex],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            this.saveDatabase(db);
            return db.volunteers[volunteerIndex];
        }
        return null;
    }

    // ========== DONATION MANAGEMENT ==========
    recordDonation(donationData) {
        const db = this.getDatabase();
        const donation = {
            id: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            ...donationData,
            status: 'completed',
            processedAt: new Date().toISOString()
        };
        db.donations.push(donation);
        
        // Update total raised
        db.settings.totalRaised += donationData.amount;
        
        this.saveDatabase(db);
        return donation;
    }

    getDonations() {
        const db = this.getDatabase();
        return db.donations || [];
    }

    getDonationById(id) {
        const donations = this.getDonations();
        return donations.find(d => d.id === id);
    }

    getDonationStats() {
        const db = this.getDatabase();
        const donations = db.donations || [];
        
        return {
            totalDonations: donations.length,
            totalRaised: donations.reduce((sum, d) => sum + (d.amount || 0), 0),
            averageDonation: donations.length > 0 
                ? donations.reduce((sum, d) => sum + (d.amount || 0), 0) / donations.length 
                : 0,
            byProgram: this.getDonationsByProgram(donations)
        };
    }

    getDonationsByProgram(donations) {
        const programs = {};
        donations.forEach(d => {
            if (d.program) {
                if (!programs[d.program]) {
                    programs[d.program] = { count: 0, total: 0 };
                }
                programs[d.program].count++;
                programs[d.program].total += d.amount || 0;
            }
        });
        return programs;
    }

    // ========== CONTACT MANAGEMENT ==========
    recordContactSubmission(contactData) {
        const db = this.getDatabase();
        const submission = {
            id: Date.now().toString(),
            ...contactData,
            status: 'new',
            submittedAt: new Date().toISOString()
        };
        db.contacts.push(submission);
        this.saveDatabase(db);
        return submission;
    }

    getContactSubmissions() {
        const db = this.getDatabase();
        return db.contacts || [];
    }

    getContactSubmissionById(id) {
        const contacts = this.getContactSubmissions();
        return contacts.find(c => c.id === id);
    }

    updateContactStatus(id, status) {
        const db = this.getDatabase();
        const contactIndex = db.contacts.findIndex(c => c.id === id);
        if (contactIndex !== -1) {
            db.contacts[contactIndex].status = status;
            db.contacts[contactIndex].updatedAt = new Date().toISOString();
            this.saveDatabase(db);
            return db.contacts[contactIndex];
        }
        return null;
    }

    // ========== EVENT REGISTRATION MANAGEMENT ==========
    registerEventParticipant(registrationData) {
        const db = this.getDatabase();
        const registration = {
            id: 'BEL' + Date.now().toString(),
            ...registrationData,
            eventName: registrationData.eventName || 'BEL Cup 2026 Badminton Tournament',
            registeredAt: new Date().toISOString()
        };
        db.eventRegistrations.push(registration);
        this.saveDatabase(db);
        return registration;
    }

    getEventRegistrations() {
        const db = this.getDatabase();
        return db.eventRegistrations || [];
    }

    // ========== STATISTICS ==========
    getStatistics() {
        const db = this.getDatabase();
        return {
            volunteers: {
                total: (db.volunteers || []).length,
                pending: (db.volunteers || []).filter(v => v.status === 'pending').length,
                approved: (db.volunteers || []).filter(v => v.status === 'approved').length
            },
            donations: {
                total: (db.donations || []).length,
                totalRaised: db.settings.totalRaised
            },
            contacts: {
                total: (db.contacts || []).length,
                unresolved: (db.contacts || []).filter(c => c.status === 'new').length
            },
            eventRegistrations: {
                total: (db.eventRegistrations || []).length
            }
        };
    }

    // ========== EMAIL TEMPLATES ==========
    getEmailTemplate(type, data) {
        const templates = {
            volunteer_confirmation: {
                subject: 'Thank You for Registering as a Volunteer',
                body: `Dear ${data.name},\n\nThank you for registering as a volunteer with BHARATH NAVA YUVA ASSOCIATION. We're excited to have you join our community.\n\nWe will review your profile and contact you within 2-3 business days with available opportunities.\n\nBest regards,\nBHARATH NAVA YUVA ASSOCIATION Team`
            },
            donation_confirmation: {
                subject: 'Donation Receipt - BHARATH NAVA YUVA ASSOCIATION',
                body: `Dear ${data.name},\n\nThank you for your generous donation of ₹${data.amount}. Your contribution will help us create lasting impact.\n\nTransaction ID: ${data.id}\nDate: ${new Date(data.timestamp).toLocaleDateString()}\n\nBest regards,\nBHARATH NAVA YUVA ASSOCIATION Team`
            },
            contact_acknowledgment: {
                subject: 'We Received Your Message',
                body: `Dear ${data.name},\n\nThank you for contacting BHARATH NAVA YUVA ASSOCIATION. We have received your message and will respond within 24-48 hours.\n\nBest regards,\nBHARATH NAVA YUVA ASSOCIATION Team`
            }
        };
        return templates[type] || null;
    }

    // ========== EXPORT DATA ==========
    exportData(format = 'json') {
        const db = this.getDatabase();
        
        if (format === 'csv') {
            return this.convertToCSV(db);
        }
        
        return JSON.stringify(db, null, 2);
    }

    convertToCSV(data) {
        let csv = 'Database Export - ' + new Date().toLocaleString() + '\n\n';
        
        csv += '=== VOLUNTEERS ===\n';
        csv += 'Name,Email,Phone,Skills,Availability,Status,Registered\n';
        data.volunteers.forEach(v => {
            csv += `"${v.name}","${v.email}","${v.phone}","${v.skills}","${v.availability}","${v.status}","${v.registeredAt}"\n`;
        });
        
        csv += '\n=== DONATIONS ===\n';
        csv += 'ID,Name,Amount,Email,Status,Date\n';
        data.donations.forEach(d => {
            csv += `"${d.id}","${d.name}","₹${d.amount}","${d.email}","${d.status}","${d.processedAt}"\n`;
        });
        
        csv += '\n=== CONTACTS ===\n';
        csv += 'Name,Email,Subject,Status,Date\n';
        data.contacts.forEach(c => {
            csv += `"${c.name}","${c.email}","${c.subject}","${c.status}","${c.submittedAt}"\n`;
        });

        csv += '\n=== BEL CUP REGISTRATIONS ===\n';
        csv += 'Name,Phone,Age,Gender,Category,Partner,Registered\n';
        data.eventRegistrations.forEach(r => {
            csv += `"${r.name}","${r.phone}","${r.age}","${r.gender}","${r.category}","${r.partner || ''}","${r.registeredAt}"\n`;
        });
        
        return csv;
    }
}

// Initialize backend
const backend = new Backend();

// ========== API ENDPOINTS (if used with Node.js Express) ==========
// These would be converted to actual endpoints in a production server

const API = {
    // Volunteer endpoints
    POST: {
        '/api/volunteers': (data) => backend.registerVolunteer(data),
        '/api/donations': (data) => backend.recordDonation(data),
        '/api/contacts': (data) => backend.recordContactSubmission(data),
        '/api/event-registrations': (data) => backend.registerEventParticipant(data)
    },
    
    // Volunteer endpoints
    GET: {
        '/api/volunteers': () => backend.getVolunteers(),
        '/api/donations': () => backend.getDonations(),
        '/api/contacts': () => backend.getContactSubmissions(),
        '/api/event-registrations': () => backend.getEventRegistrations(),
        '/api/statistics': () => backend.getStatistics(),
        '/api/export/json': () => backend.exportData('json'),
        '/api/export/csv': () => backend.exportData('csv')
    }
};
