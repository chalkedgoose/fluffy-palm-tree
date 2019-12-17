const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const { URLMappingModel } = require('./model');
const { generateID } = require('./uid');

mongoose
.connect('mongodb://localhost:27017/critical-mass-url-redirection',
 { useNewUrlParser: true, useCreateIndex: true });

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/shorten', async (req, res) => {
    try {
        const lookup = await URLMappingModel.findOne({ href: req.body.href }).exec();
        if(lookup !== null){
            return res.status(200).json({
                href: `http://localhost:3000/${lookup.uid}`
            })
        }
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

app.get('*', (req, res) => {
    // client.get(req.url.split('/')[1], (err, value) => {
    //     if(err) return res.status(500)
    //     res.status(200).redirect(value);
    // });
});

app.get('/', (_, res) => {
    return res.status(200).sendFile('index.html');
});


app.listen(3000, () => console.log('URL Shortening Application Running at Port:3000'));