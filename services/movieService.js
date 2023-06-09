const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyparser = require('body-parser');
require('dotenv').config();
const uri = process.env.URI;

class movieService{

    constructor(){}
    
    //CREATE
    async insertOne(){
        const client = new MongoClient(uri);
        const body = req.body;
        try{
            await client.connect();
            const resultado = await client.db("sample_mflix").collection("movies").insertOne(body).toArray();
            if (resultado) {
                res.send(resultado);
            } else {
                res.status(201).json({
                    "message": "Se creo una pelicula",
                    data: body,
                    resultado,
                });
            }
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }
    //READ
    //Find
    async find(limit, offset){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const resultado = await client.db("sample_mflix").collection("movies").find({}).skip(Number(offset)).limit(Number(limit)).toArray();
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }

    //findOne
    async findOne(){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const resultado = await client.db("sample_mflix").collection("movies").findOne({_id: new ObjectId(id)});
            if (resultado) {
                res.send(resultado);
            } else {
                res.send("No se encontró la pelicula");
            }
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }
    //UPDATE
    async updateOne(){
        const id = req.params.id;
        const client = new MongoClient(uri);
        const body = req.body;
        try{
            await client.connect();
            const resultado = await client.db("sample_mflix").collection("movies").updateOne({"_id": new ObjectId(id)}, {
                $set:{
                    title: body.title,
                    year: body.year
                }}).toArray();
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }
    //DELETE
    async deleteOne(id){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const resultado = await client.db("sample_mflix").collection("movies").deleteOne({_id: new ObjectId(id)});
            return resultado;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }
}
       
module.exports = movieService;