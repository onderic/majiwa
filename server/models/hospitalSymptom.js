import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import Hospital from './hospital.js';
import Symptom from './symptom.js';

const HospitalSymptom = sequelize.define('HospitalSymptom', {
    hospitalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Hospital,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    symptomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Symptom,
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
});

export default HospitalSymptom;
