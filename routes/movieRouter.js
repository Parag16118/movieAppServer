const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const dotenv=require('dotenv')
const request=require('request')
dotenv.config()
const movieRouter = express.Router();

movieRouter.use(express.json());
dotenv.config()

movieRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url, function(error,response,body){
        if(!error&&response.statusCode==200){
            const data=JSON.parse(body)
            // console.log(data);
            return res.json(data);
        }
        else{
            err=new Error('Movie '+req.query.movieName+' not found');
            err.status=404;
            return next(err); 
        }
    })
    
})


movieRouter.route('/:id')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function(error,response,body){
        if(!error&&response.statusCode==200){
            const data=JSON.parse(body)
            res.json(data);
        }
        else{
            err=new Error('Movie with id '+req.params.id+' not found');
            err.status=404;
            return next(err); 
        }
    })
})

module.exports = movieRouter;