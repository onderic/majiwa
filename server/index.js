import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js'; 
import { DataTypes } from 'sequelize';

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Define a model
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Sync database
sequelize.sync().then(() => {
    console.log('Database & tables created!');
});

// Define a route to get users
app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// Define a route to create a user
app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.json(newUser);
});

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
