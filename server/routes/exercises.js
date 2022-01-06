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

module.exports = router;
