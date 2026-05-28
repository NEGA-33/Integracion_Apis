const express = require('express');
const MaestroModel = require('./modelos/Maestro');
const sequelize = require('./db/connection');
const app = express();
app.use(express.json());




app.get('/maestros', async (req, res) => {
    try {
        const result = await MaestroModel.findAll();
        if (result.length > 0) {
            res.status(200).json({
                message: 'Lista de maestros',
                data: result
            });
        } else {
            res.status(400).json({
                message: 'No se encontraron maestros',
                data: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los maestros',
            error: error.message
        });
    }
});


app.get('/maestros/estudiante/:idEstudiante', async (req, res) => {
    try {
        const result = await MaestroModel.findAll({
            where: {
                idEstudiante: parseInt(req.params.idEstudiante)
            }
        });
        if (result.length > 0) {
            res.status(200).json({
                message: `Maestros del estudiante ${req.params.idEstudiante}`,
                data: result
            });
        } else {
            res.status(400).json({
                message: 'No se encontraron maestros para ese estudiante',
                data: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los maestros del estudiante',
            error: error.message
        });
    }
});


app.post('/maestros', async (req, res) => {
    try {
        const { nombre, apellido, materia, idEstudiante, estado } = req.body;
        const result = await MaestroModel.create({
            nombre,
            apellido,
            materia,
            idEstudiante,
            estado
        });
        res.status(201).json({
            message: 'Maestro agregado correctamente',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al agregar el maestro',
            error: error.message
        });
    }
});


app.put('/maestros/:idMaestro', async (req, res) => {
    try {
        const { nombre, apellido, materia, idEstudiante, estado } = req.body;
        const result = await MaestroModel.update(
            { nombre, apellido, materia, idEstudiante, estado },
            { where: { idMaestro: req.params.idMaestro } }
        );
        if (result[0] > 0) {
            res.status(200).json({
                message: 'Maestro actualizado correctamente',
                data: result
            });
        } else {
            res.status(400).json({
                message: 'No se encontró el maestro con ese ID',
                data: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al actualizar el maestro',
            error: error.message
        });
    }
});


app.delete('/maestros/:idMaestro', async (req, res) => {
    try {
        const result = await MaestroModel.destroy({
            where: { idMaestro: req.params.idMaestro }
        });
        if (result > 0) {
            res.status(200).json({
                message: 'Maestro eliminado correctamente',
                data: result
            });
        } else {
            res.status(400).json({
                message: 'No se encontró el maestro con ese ID',
                data: []
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el maestro',
            error: error.message
        });
    }
});


// Servidor escuchando en el puerto 5000

app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});