// models/hospitalSymptom.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const HospitalSymptom = sequelize.define('HospitalSymptom', {
    hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Hospitals',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    symptomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Symptoms',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
});

export default HospitalSymptom;
