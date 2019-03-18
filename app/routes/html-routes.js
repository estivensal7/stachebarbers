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

        app.get("/book-appointment",function(req,res){
                res.sendFile(path.join(__dirname, '../public/appointment.html'));
        });

        app.get("/Chaz",function(req,res){
                res.sendFile(path.join(__dirname, '../public/chaz.html'));
        });

        app.get("/Checo",function(req,res){
                res.sendFile(path.join(__dirname, '../public/checo.html'));
        });

        app.get("/Gregory",function(req,res){
                res.sendFile(path.join(__dirname, '../public/greg.html'));
        });

        app.get("/Teruyuki",function(req,res){
                res.sendFile(path.join(__dirname, '../public/terry.html'));
        });

        app.get("/Nick",function(req,res){
                res.sendFile(path.join(__dirname, '../public/nick.html'));
        });

        app.get("/Pablo",function(req,res){
                res.sendFile(path.join(__dirname, '../public/pablo.html'));
        });

        app.get("/charge/update",function(req,res){
                res.sendFile(path.join(__dirname, '../public/success.html'));
        });

        app.get("/single-item/:routeName/view",function(req,res){
                res.sendFile(path.join(__dirname, '../public/singleProduct.html'));
        });

module.exports = app;