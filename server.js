const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.listen(PORT, function (){
    console.log(`Now listening on ${PORT}`)
});
