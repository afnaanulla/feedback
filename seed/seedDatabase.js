const mongoose = require('mongoose');
const User = require('../models/User');
const Subject = require('../models/Subject');
require('dotenv').config();
const connectDB = require('../config/db');

const seedDatabase = async () => {
    await connectDB();
    try {
        // Clear existing data
        await User.deleteMany();
        await Subject.deleteMany();

        // Seed Users
        const users = [];
        for (let i = 1; i <= 50; i++) {
            users.push({
                username: `student${i}`,
                password: 'password123', // Plain text password
                name: `Student ${i}`
            });
        }
        await User.insertMany(users);
        console.log('Students seeded successfully.');

        // Seed Subjects (Only Semesters 1 and 2)
        const subjects = [
            // CSE Subjects
            { name: 'Mathematics', branch: 'CSE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Physics', branch: 'CSE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Programming in C', branch: 'CSE', semester: 2, btechYear: 1, type: 'Practical' },
            { name: 'Data Structures', branch: 'CSE', semester: 2, btechYear: 1, type: 'Theory' },

            // ECE Subjects
            { name: 'Mathematics', branch: 'ECE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Physics', branch: 'ECE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Basic Electronics', branch: 'ECE', semester: 2, btechYear: 1, type: 'Theory' },
            { name: 'Circuit Theory', branch: 'ECE', semester: 2, btechYear: 1, type: 'Theory' },

            // EEE Subjects
            { name: 'Mathematics', branch: 'EEE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Physics', branch: 'EEE', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Electrical Circuits', branch: 'EEE', semester: 2, btechYear: 1, type: 'Theory' },
            { name: 'Digital Logic Design', branch: 'EEE', semester: 2, btechYear: 1, type: 'Theory' },

            // MECH Subjects
            { name: 'Mathematics', branch: 'MECH', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Physics', branch: 'MECH', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Engineering Drawing', branch: 'MECH', semester: 2, btechYear: 1, type: 'Practical' },
            { name: 'Thermodynamics', branch: 'MECH', semester: 2, btechYear: 1, type: 'Theory' },

            // CIVIL Subjects
            { name: 'Mathematics', branch: 'CIVIL', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Physics', branch: 'CIVIL', semester: 1, btechYear: 1, type: 'Theory' },
            { name: 'Surveying', branch: 'CIVIL', semester: 2, btechYear: 1, type: 'Practical' },
            { name: 'Structural Analysis', branch: 'CIVIL', semester: 2, btechYear: 1, type: 'Theory' }
        ];

        await Subject.insertMany(subjects);
        console.log('Subjects seeded successfully.');

        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
