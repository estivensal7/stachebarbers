// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

//Dependancies 
const express = require('express');
const path = require('path');
const app = express();

// Routes
// =============================================================

        app.get('/', function(req, res) {
                res.sendFile(path.join(__dirname, '../public/home.html'));
        });

        app.get("/about",function(req,res){
                res.sendFile(path.join(__dirname, '../public/about.html'));
        });

        app.get("/checkout",function(req,res){
                res.sendFile(path.join(__dirname, '../public/checkout.html'));
        });

        app.get("/gallery",function(req,res){
                res.sendFile(path.join(__dirname, '../public/gallery.html'));
        });


        app.get("/gallery-gentlemens",function(req,res){
                res.sendFile(path.join(__dirname, '../public/gallery-gentlemens.html'));
        });

        app.get("/gallery-stache",function(req,res){
                res.sendFile(path.join(__dirname, '../public/gallery-stache.html'));
        });

        app.get("/news",function(req,res){
                res.sendFile(path.join(__dirname, '../public/news.html'));
        });

        app.get("/services",function(req,res){
                res.sendFile(path.join(__dirname, '../public/services.html'));
        });

        app.get("/products/",function(req,res){
                res.sendFile(path.join(__dirname, '../public/shop.html'));
        });

        app.get("/contact",function(req,res){
                res.sendFile(path.join(__dirname, '../public/contact.html'));
        });

        // app.get("/",function(req,res){
        //         res.sendFile(path.join(__dirname, '../public/success.html'));
        // });

module.exports = app;