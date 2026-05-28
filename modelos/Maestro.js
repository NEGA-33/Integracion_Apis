const sequelize = require('../db/connection');
const { DataTypes } = require('sequelize');

const Maestro = sequelize.define('Maestro', {
    idMaestro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellido: {
        type: DataTypes.STRING,
    },
    materia: {
        type: DataTypes.STRING,
    },
    idEstudiante: {
        type: DataTypes.INTEGER,
    },
    estado: {
        type: DataTypes.INTEGER,
    },
}, {
    tableName: 'Maestros',
    timestamps: false,
});

module.exports = Maestro;