const express = require('express');
const router = express.Router();
const Exercise = require('../models/exerciseModel');
const authenticate = require('../middleware/authenticate.js')

/* GET users listing. */
router.get('/test', authenticate, async (req, res) => {
    try {
        const user = {
            name: 'ACM Hack',
            email: 'hack@acmucsd.org'
        }
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(500).send();
    }
});

// Get exercise data
router.get('/log', authenticate, async (req, res) => {
    try {
        // Find and return all data that belongs to user
        const data = await Exercise.find({ user: req.user });
        res.json(data);
    } catch (err) {
        res.status(500).send();
    }
});

// Save a new exercise
router.post('/log', authenticate, async (req, res) => {
    try {
        const { exerciseName, exercisePR, exerciseHistory, exerciseGoal } = req.body;

        // Create a new exercise
        const newExercise = new Exercise({
            user: req.user,
            exerciseName,
            exercisePR,
            exerciseHistory,
            exerciseGoal
        });

        // Save the exercise to db
        const savedExercise = await newExercise.save();
        res.json(savedExercise);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

// TODO: update document route
router.post('/log/update', authenticate, async (req, res) => {
    try {
        const { user, exerciseName, exerciseHistory, exerciseGoal } = req.body;

        // Sort exerciseHistory by date
        exerciseHistory.sort(function(a, b) {
            var dateA = new Date(a.date);
            var dateB = new Date(b.date);
            return dateA - dateB;
        });

        // Check for PR in history and update PR
        let exercisePR = {
            value: 0,
            reps: 0,
            date: Date
        };

        exerciseHistory.forEach((exercise) => {
            if (exercise.value > exercisePR.value) {
                exercisePR = exercise;
            }
        });

        const newExercise = {
            user: req.user,
            exerciseName,
            exercisePR,
            exerciseHistory,
            exerciseGoal
        };

        const query = {
            user: req.user,
            exerciseName: exerciseName
        }

        // Check if new exercise
        const existingExercise = await Exercise.findOne(query);
        if (!existingExercise) {
            const createExercise = new Exercise({
                user: req.user,
                exerciseName,
                exercisePR,
                exerciseHistory,
                exerciseGoal
            });

            const savedExercise = await createExercise.save();
        }
        else {
            // Save the new data
            const savedExercise = await Exercise.replaceOne(query, newExercise);
        }

        res.json({
            success: true,
            updatedExercise: newExercise
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false
        });
    }
});

// Delete a user's exercise
router.delete('/log/delete', authenticate, async (req, res) => {
    try {
        const { exerciseName } = req.body;

        const deletedExercise = await Exercise.findOneAndDelete({ user: req.user, exerciseName });

        if (!deletedExercise) {
            return res.status(400).json({
                success: false,
                errorMessage: "Exercise does not exist!",
                exercise: null
            });
        }
        
        res.json({
            success: true,
            errorMessage: null,
            exercise: deletedExercise
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            errorMessage: "An error has occurred",
            exercise: null
        })
    }
});

module.exports = router;
