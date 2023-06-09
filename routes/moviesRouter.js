const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyparser = require('body-parser');
const router = express.Router();
const movieService = require('../services/movieService');
const service = new movieService();

//FIND

router.get('/', async(req, res)=>{
    const { limit , offset} = req.query;
    const movies = await service.find();
    if (movies) {
        res.status(200).send(movies);
    } else {
        res.send("No se encontró la pelicula");
    }
})

//FindOne
router.get('/:id', async(req, res)=>{
    const resultado = await service.findOne();
    const id = req.params;
    if (resultado) {
        res.status(200).send(resultado);
    } else {
        res.send("No se encontró la pelicula");
    }
})

//CREATE
//insertOne
router.post('/', async(req, res)=>{
    const body = req.body;
    const resultado = await service.insertOne();
    if (resultado) {
        res.send(resultado);
    } else {
        res.status(201).json({
            "message": "Se creo una pelicula",
            data: body,
            resultado,
        });
    }
})

//UPDATE
router.patch('/:id', async(req, res)=>{
    const id = req.params.id;
    const client = new MongoClient(uri);
    const body = req.body;
    const resultado = await service.updateOne();
    if (resultado) {
        res.send(resultado);
    } else {
        res.status(200).json({
            "message": "Se modifica una pelicula",
            data: body,
            resultado,
        });
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
            res.send("No se encontró la pelicula");
        }
    })

module.exports = router;