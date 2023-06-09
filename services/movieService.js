const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyparser = require('body-parser');
const res = require('express/lib/response');
require('dotenv').config();
const uri = process.env.URI;

class movieService{

    constructor(){}
    
    //CREATE
    async insertOne(body){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const resultado = await client.db("sample_mflix").collection("movies").insertOne(body).toArray();
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
            return resultado;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }

    //findOne
    async findOne(id){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const resultado = await client.db("sample_mflix").collection("movies").findOne({_id: new ObjectId(id)});
            return resultado;
        }catch(e){
            console.log(e);
        }finally{
            await client.close();
        }
    }
    //UPDATE
    async updateOne(id, title, year){
        const client = new MongoClient(uri);
        try{
            await client.connect();
            const resultado = await client.db("sample_mflix").collection("movies").updateOne({"_id": new ObjectId(id)}, {
                $set:{
                    title: title,
                    year: year
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