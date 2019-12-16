const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const app = express();

const client = redis.createClient(6379);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/shorten', (req, res) => {
    try {
        return res.status(201).json(req.body);
    } catch (error) {
        console.log(error.message)
        return res.status(500);
    }
});

app.get('/', (_, res) => {
    return res.status(200).sendFile('index.html');
});


app.listen(3000, () => console.log('URL Shortening Application Running at Port:3000'));