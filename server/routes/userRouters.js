import express from 'express';
import bcrypt from 'bcrypt';
import Users from '../models/Users.js'; 
const router = express.Router();

// User Registration
router.post('/users', async (req, res) => {
    const { userame, role, email, password } = req.body; 

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with hashed password
        const newUser = await Users.create({
            userame,
            email,
            role,
            password: hashedPassword, 
        });

        res.status(201).json(newUser); 
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Note: role is not needed for login

    try {
        // Find user by email
        const user = await Users.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return user profile data
        res.json({
            id: user.id,
            userame: user.userame,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
