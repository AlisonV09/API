const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyparser = require('body-parser');
const router = express.Router();
const movieService = require('../services/movieService');
const service = new movieService();

//FIND

router.get('/', async(req, res)=>{
    const { limit , offset} = req.query;
    const movies = await service.find(limit, offset);
    if (movies) {
        res.status(200).send(movies);
    } else {
        res.status(404).send("No se encontró la pelicula");
    }
})

//FindOne
router.get('/:id', async(req, res)=>{
    const resultado = await service.findOne(id);
    const id = req.params.id;
    if (resultado) {
        res.status(200).send(resultado);
    } else {
        res.status(404).send("No se encontró la pelicula");
    }
})

//CREATE
//insertOne
router.post('/', async(req, res)=>{
    const body = req.body;
    const resultado = await service.insertOne(body);
    if (resultado) {
        res.status(201).json({
            "message": "Se creo una pelicula",
            resultado,
        })
    } else {
        res.status(404).send("No se creo la pelicula");
    }
})

//UPDATE
router.patch('/:id', async(req, res)=>{
    const id = req.params.id;
    const { title, year } = req.body;
    const resultado = await service.updateOne(id, title, year);
    if (resultado) {
        res.status(201).json({
            "message": "Se modifica una pelicula",
            resultado,
        });
    } else {
        res.status(404).send("No se actualizo la pelicula");
    }
})

//DELETE
router.delete('/:id', async(req, res)=>{
    const id = req.params;
    const resultado = await service.deleteOne(id);
        if (resultado) {
            res.status(204),json({
                "message": "se elimino la pelicula",
                resultado,
            });
        } else {
            res.status(404).send("No se encontró la pelicula");
        }
    })

module.exports = router;