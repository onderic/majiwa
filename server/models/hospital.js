// models/Hospital.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; 

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
});

export default Hospital;
