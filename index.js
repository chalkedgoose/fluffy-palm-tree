const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const { URLMappingModel } = require('./model');
const { generateID } = require('./uid');

mongoose
.connect('mongodb://localhost:27017/critical-mass-url-redirection',
 { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(express.static('public'));

// main shortener endpoint
app.post('/shorten', async (req, res) => {
    try {
        const lookup = await URLMappingModel.findOne({ href: req.body.href }).exec();
        // If a processed shortand URL does exist it's returned
        if(lookup !== null){
            return res.status(200).json({
                href: `http://localhost:3000/${lookup.uid}`
            })
        }
        // if a processed shortand URL does not exist it's created
        else if(lookup === null){
            const uid = generateID();
            const urlMapping = new URLMappingModel({ uid, href: req.body.href })
            await urlMapping.save()
            return res.status(201).json({
                href: `http://localhost:3000/${uid}`
            });
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(error.message);
    }
});

// redirects all urls containing a uuid to their respective sites and 404ing non existent ones.
app.get('*', async (req, res) => {
    try {
        const lookup = await URLMappingModel.findOne({ uid: req.url.split('/')[1] }).exec();
        if(lookup !== null){
            return res.status(200).redirect(lookup.href);
        }
        if(lookup === null){ 
            return res.status(400).send('Link not found');
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});

// static index page
app.get('/', (_, res) => {
    return res.status(200).sendFile('index.html');
});


app.listen(3000, () => console.log('URL Shortening Application Running at Port:3000'));

module.exports = app;