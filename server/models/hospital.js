// models/Hospital.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; 
import Symptom from './symptom.js';
import HospitalSymptom from './hospitalSymptom.js';

const Hospital = sequelize.define('Hospital', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bedsAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM('Level2', 'Level3', 'Level4', 'Level5', 'Level6'),
        allowNull: false
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0 
    },
    longitude: {
        type: DataTypes.FLOAT, 
        allowNull: false,
        defaultValue: 0.0 
    }
});

Hospital.belongsToMany(Symptom, { through: HospitalSymptom, foreignKey: 'hospitalId', onDelete: 'CASCADE' });
Symptom.belongsToMany(Hospital, { through: HospitalSymptom, foreignKey: 'symptomId', onDelete: 'CASCADE' });

export default Hospital;
