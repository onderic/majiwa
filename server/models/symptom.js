// models/Symptom.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import HospitalSymptom from './hospitalSymptom.js';

const Symptom = sequelize.define('Symptom', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Symptom.hasMany(HospitalSymptom, {
    foreignKey: 'symptomId',
    onDelete: 'CASCADE',
});
HospitalSymptom.belongsTo(Symptom, {
    foreignKey: 'symptomId',
});

export default Symptom;
