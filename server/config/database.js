import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('majiwa', 'majiwa', '0909', {
    host: 'localhost',
    dialect: 'mysql'
});

export { sequelize };
