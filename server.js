const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist/angular-starter')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/angular-starter', 'index.html'));
});

const port = 4200;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

