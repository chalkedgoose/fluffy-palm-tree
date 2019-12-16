const express = require('express'); 
const app = express(); 

app.use(express.static('public'));
app.use(express.json());

app.get('/', (_, res) => res.status(200).sendFile('index.html'));

app.post('/shorten', (req, res) => {
    return res.status(201).json(req.body);
});

app.listen(3000, () => console.log('URL Shortening Application Running at Port:3000'));