


const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

router.get("/", async (req, res) => {
    try {
        const { branch, semester, btechYear } = req.query;

        const validBranches = ["CSE", "ECE", "EEE", "IT", "MECH", "CIVIL"];
        const validSemesters = [1, 2, 3, 4, 5, 6, 7, 8];
        const validYears = [1, 2, 3, 4];
        if (!branch || !semester || !btechYear) {
            return res.status(400).json({ error: "Branch, semester, and B.Tech year are required" });
        }

        if (!validBranches.includes(branch.toUpperCase())) {
            return res.status(400).json({ error: "Invalid branch" });
        }
        if (!validSemesters.includes(parseInt(semester))) {
            return res.status(400).json({ error: "Invalid semester" });
        }
        if (!validYears.includes(parseInt(btechYear))) {
            return res.status(400).json({ error: "Invalid B.Tech year" });
        }

        const subjects = await Subject.find({ branch, semester, btechYear });

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
