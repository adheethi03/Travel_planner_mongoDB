const express = require('express');
const Trip = require('../model/planner.js');
const router = express.Router();

router.post('/', async (req, res) => {
    const { place, start, end, plans } = req.body;
    try {
        const newTrip = new Trip({ place, start, end, plans });
        await newTrip.save();
        res.status(201).json(newTrip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await Trip.findById(id);
        if (!trip) return res.status(404).json({ error: 'Trip not found' });
        res.status(200).json(trip);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { place, start, end, plans } = req.body;
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(
            id,
            { place, start, end, plans },
            { new: true }
        );
        if (!updatedTrip) return res.status(404).json({ error: 'Trip not found' });
        res.status(200).json(updatedTrip);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTrip = await Trip.findByIdAndDelete(id);
        if (!deletedTrip) return res.status(404).json({ error: 'Trip not found' });
        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;