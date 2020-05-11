const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const routes = require('./server/routes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'dist/website')));
app.use('/api', routes);
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/website/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
app.listen(port, function () {
  console.info(`Server started on http://localhost:${port}`)
});
