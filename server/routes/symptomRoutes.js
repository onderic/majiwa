// routes/symptomRoutes.js
import express from 'express';
import Symptom from '../models/symptom.js';

const router = express.Router();

// Get all symptoms
router.get('/symptoms', async (req, res) => {
    try {
        const symptoms = await Symptom.findAll();
        res.json(symptoms);
    } catch (error) {
        console.error('Error fetching symptoms:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single symptom by ID
router.get('/symptoms/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const symptom = await Symptom.findByPk(id);
        if (!symptom) {
            return res.status(404).json({ error: 'Symptom not found' });
        }
        res.json(symptom);
    } catch (error) {
        console.error('Error fetching symptom:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new symptom
router.post('/symptoms', async (req, res) => {
    const { name } = req.body;
    try {
        const newSymptom = await Symptom.create({ name });
        res.status(201).json(newSymptom);
    } catch (error) {
        console.error('Error creating symptom:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a symptom by ID
router.put('/symptoms/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        let symptom = await Symptom.findByPk(id);
        if (!symptom) {
            return res.status(404).json({ error: 'Symptom not found' });
        }
        symptom.name = name;
        await symptom.save();
        res.json(symptom);
    } catch (error) {
        console.error('Error updating symptom:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a symptom by ID
router.delete('/symptoms/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const symptom = await Symptom.findByPk(id);
        if (!symptom) {
            return res.status(404).json({ error: 'Symptom not found' });
        }
        await symptom.destroy();

        res.status(204).end();
    } catch (error) {
        console.error('Error deleting symptom:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
