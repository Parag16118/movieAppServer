const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
const dotenv=require('dotenv')

const movieRouter = express.Router();

movieRouter.use(bodyParser.json());
dotenv.config()

movieRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url, function(error,response,body){
        if(!error&&response.statusCode==200){
            res.json(data);
        }
        else{
            err=new Error('Movie '+req.query.movieName+' not found');
            err.status=404;
            return next(err); 
        }
    })
    
})


movieRouter.get('/:id')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    const url=`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function(error,response,body){
        if(!error&&response.statusCode==200){
            // const data=JSON.parse(body)
            // res.render("AboutMovie",{movieData:data,navActive:"none"})
            res.json(data);
        }
        else{
            err=new Error('Movie with id '+req.params.id+' not found');
            err.status=404;
            return next(err); 
        }
    })
})

