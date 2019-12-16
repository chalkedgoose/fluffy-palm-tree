const express = require('express'); 
const bodyParser = require('body-parser');
const app = express(); 

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/shorten', (req, res) => {
    console.log(req.body)
    return res.status(201).json(req.body);
});

app.get('/', (_, res) => {
    return res.status(200).sendFile('index.html');
});


app.listen(3000, () => console.log('URL Shortening Application Running at Port:3000'));