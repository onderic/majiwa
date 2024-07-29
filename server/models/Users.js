// models/User.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'; 

const User = sequelize.define('User', {
  userame: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true,
    },
  },

  role: {
    type: DataTypes.ENUM('user',  'admin'),
    allowNull: false,
    defaultValue: 'user',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});






export default User;
