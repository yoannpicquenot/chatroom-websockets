var express = require('express');
var app = express();

const port = 5000;

app.listen(port, (err) => {
    console.log(err ? err : `Server is listening on port ${port}...`);
});
