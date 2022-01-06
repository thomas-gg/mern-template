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
        // Front end gives exercise name
        const { exerciseName, exercisePR, exerciseHistory, exerciseGoal } = req.body;

        // Check for PR in history and update PR

        // Add counter if history is updated

        // Save the new data
    }
    catch (err) {

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
