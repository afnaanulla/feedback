


const express = require("express");
const Rating = require("../models/Rating");
const Subject = require("../models/Subject");
const User = require("../models/User");

const router = express.Router();

// ✅ Submit Ratings for Multiple Subjects
router.post("/rate", async (req, res) => {
    try {
        const { userId, ratings } = req.body; // ratings = [{subjectId, rating}]

        // Validate user
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: "Invalid user ID" });
        }

        for (const { subjectId, rating } of ratings) {
            // Validate rating range
            if (rating < 1 || rating > 5) {
                return res.status(400).json({ message: "Rating must be between 1 and 5" });
            }

            // Validate subject
            const subjectExists = await Subject.findById(subjectId);
            if (!subjectExists) {
                return res.status(404).json({ message: `Invalid subject ID: ${subjectId}` });
            }

            // ✅ Check if user has already rated this subject
            let userRating = await Rating.findOne({ subject: subjectId, user: userId });

            if (userRating) {
                // Update existing rating
                userRating.rating = rating;
                await userRating.save();
            } else {
                // Create new rating entry
                userRating = new Rating({
                    user: userId,
                    subject: subjectId,
                    rating: rating
                });
                await userRating.save();
            }
            
        }

        for (const { subjectId } of ratings) {
            const subjectRatings = await Rating.find({ subject: subjectId });
            const totalRating = subjectRatings.reduce((sum, r) => sum + r.rating, 0);
            const studentCount = subjectRatings.length;
            const averageRating = studentCount > 0 ? (totalRating / studentCount).toFixed(2) : "0.00";

            // ✅ Update Subject's average rating
            await Subject.findByIdAndUpdate(subjectId, { averageRating, studentCount });
        }

        res.json({ message: "Ratings submitted successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
