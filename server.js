const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, function (){
    console.log(`Now listening on ${PORT}`)
})