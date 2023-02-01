const { Sequelize } = require('sequelize');
const { db_model } = require('./db-model');

const sequelize = new Sequelize(db_model.database, db_model.username, db_model.password, {
    host: db_model.host,
    dialect: db_model.dialect,
    define: { freezeTableName: true}
});

const dbConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Data Base -> houlakdb - online');
      } catch (error) {
        console.log(error);
        console.error('Error al iniciar la base de datos');
      }
}

module.exports = {
    dbConnection,
    sequelize
}