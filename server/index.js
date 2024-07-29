// server.js
import express from 'express';
import cors from 'cors';
import { sequelize } from './config/database.js'; 
import symptomRoutes from './routes/symptomRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import userRouters from './routes/userRouters.js';

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Sync database
sequelize.sync({alter:true}).then(() => {
    console.log('Database & tables created!');
});

// Use symptom routes
app.use('/api', symptomRoutes,hospitalRoutes,userRouters);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
