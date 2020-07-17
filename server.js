const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const port = 3333;

app.use(express.static('client/dist'))


app.listen(port, () => console.log(`Wooden spoon started on port: http://localhost:${port}`));