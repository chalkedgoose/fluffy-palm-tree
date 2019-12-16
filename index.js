const express = require('express'); 
const app = express(); 

app.use(express.urlencoded());

app.listen(3000, () => console.log('URL Shortening Application Running at Port:3000'));