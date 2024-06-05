// models/Symptom.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; 

const Symptom = sequelize.define('Symptom', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Symptom;
