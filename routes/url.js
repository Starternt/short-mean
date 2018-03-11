var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Url = require('../models/Url.js');
var path = require('path');
var validUrl = require('valid-url');
var request = require('request');


/* REDIRECT */
router.get('/*', function (req, res, next) {
    let shortUrl = req.originalUrl;
    shortUrl = shortUrl.replace('/', '');
    console.log(shortUrl); // '/admin/new'
    Url.find({short_url: shortUrl}, function (err, url) {
        if (err) return next(err);
        if (Object.keys(url).length != 0) {
            let path = url[0]['original_url'];
            console.log(path);
            res.redirect(path);

        } else {
            console.log('This is false');
            console.log(__dirname);
            res.status(404).sendFile(path.join(__dirname, '../404.html'));
        }
    })
});

/* CREATE URL */
router.post('/', function (req, res, next) {
    if (validUrl.isUri(req.body.original_url)) {
        request(req.body.original_url, function (error, response, body) { // ДЕЛАЕМ ПРОВЕРКУ ОТВЕТА СЕРВЕРА
            if (!error && response.statusCode == 200) {
                console.log('RESPONSE TRUE!!!!');
                let shortUrl = Math.random().toString(36).substring(7);

                Url.find({short_url: shortUrl}, function (err, url) {
                    if (err) return next(err);

                    if (Object.keys(url).length == 0) {
                        console.log("Not found. Success!");
                        req.body.uses = 0;
                        req.body.short_url = shortUrl; // Ставим сгенерированную строку
                        console.log('requrl:' + req.body.short_url);

                        Url.create(req.body, function (err, post) { // В пост находится та книга что пришла + её айди в базе
                            if (err) return next(err);
                            console.log("CREATEDDDDD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                            console.log(post);
                            res.json(post);
                        });
                    } else {
                        console.log('This is false');
                    }
                });

            }
            else {
                console.log('RESPONSE FALSE AND NOT 200!');
                res.json({valid_original: 1});
            }
        });

    }
    else {
        res.json({valid_original: 1});
    }


});

module.exports = router;