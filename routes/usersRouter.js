const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://alison:888@cluster0.ic3usfo.mongodb.net/?retryWrites=true&w=majority";
const router = express.Router(); 

router.get('/', async(req, res)=>{
    const client = new MongoClient(uri);
    try{
        await client.connect();
        const resultado = await client.db("sample_mflix").collection("users").find({}).limit(5).toArray();
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
})

module.exports = router;