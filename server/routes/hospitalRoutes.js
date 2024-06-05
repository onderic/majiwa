import express from 'express';
import Hospital from '../models/hospital.js';
import HospitalSymptom from '../models/hospitalSymptom.js';
import Symptom from '../models/symptom.js';
import { sequelize } from '../config/database.js';


const router = express.Router();

// SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

router.post('/find-hospitals', async (req, res) => {
    const { symptoms } = req.body;
    try {
        const hospitals = await Hospital.findAll({
            include: [
                {
                    model: Symptom,
                    through: {
                        attributes: []
                    },
                    where: {
                        id: symptoms
                    },
                    required: true
                }
            ],
            group: ['Hospital.id'], 
            having: sequelize.literal(`COUNT(DISTINCT Symptoms.id) = ${symptoms.length}`)
        });

        res.json(hospitals);
    } catch (error) {
        console.error('Error finding hospitals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Get all hospitals
router.get('/hospitals', async (req, res) => {
    try {
        const hospitals = await Hospital.findAll({
            include: [
                {
                    model: Symptom,
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        res.json(hospitals);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a single hospital by ID
router.get('/hospitals/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const hospital = await Hospital.findByPk(id);
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        res.json(hospital);
    } catch (error) {
        console.error('Error fetching hospital:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new hospital
router.post('/hospitals', async (req, res) => {
    const { name, location, address, capacity, bedsAvailable, level, symptoms } = req.body;
    try {
        // Create the hospital first
        const newHospital = await Hospital.create({
            name,
            location,
            address,
            capacity,
            bedsAvailable,
            level,
        });

        console.log("symptoms",symptoms)

        // Now handle symptoms
        if (symptoms && symptoms.length > 0) {
            // Create associations between hospital and symptoms
            await Promise.all(symptoms.map(async symptomId => {
                await HospitalSymptom.create({
                    hospitalId: newHospital.id,
                    symptomId
                });
            }));
        }

        res.status(201).json(newHospital);
    } catch (error) {
        console.error('Error creating hospital:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a hospital by ID
router.put('/hospitals/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, address, capacity, bedsAvailable, level, symptoms } = req.body;
    try {
        let hospital = await Hospital.findByPk(id);
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        await hospital.update({
            name,
            location,
            address,
            capacity,
            bedsAvailable,
            level,
            symptoms
        });
        res.json(hospital);
    } catch (error) {
        console.error('Error updating hospital:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a hospital by ID
router.delete('/delete/hospitals/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const hospital = await Hospital.findByPk(id);
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }

        await HospitalSymptom.destroy({
            where: {
                hospitalId: id
            }
        });

        // Delete the hospital
        await hospital.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting hospital:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




export default router;
