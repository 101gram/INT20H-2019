const express = require('express'),
    path = require('path');
   
const app = express();
const PORT = 3000;

// if (!Number.isInteger(PORT)) {
//     console.error('Bad port, please set PORT as env variable');
//     process.abort();
// }

app.listen(PORT, () => console.log('Server started at port:', PORT));

app.use(express.static('./dist/'));
app.use(express.static('./assets/'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.use((err, req, res) => {
    console.error(err.stack);
    return res.status(500).end(`Internal srever error: ${err.message}`);
});
