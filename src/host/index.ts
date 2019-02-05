import Express from 'express';
import Path    from 'path';
   
const app = Express(); 
const PORT = 3000;

// if (!Number.isInteger(PORT)) {
//     console.error('Bad port, please set PORT as env variable');
//     process.abort();
// }

app.listen(PORT, () => console.log('Server started at port:', PORT));

app.use(Express.static('./dist/'));
app.use(Express.static('./node_modules/react/umd/'));
app.use(Express.static('./node_modules/react-dom/umd/'));

app.get('*', (_req, res) => {
    res.sendFile(Path.join(`${__dirname}/src/index.html`));
});

app.use(((err, _req, res, _next) => {
    console.error(err.stack);
    return res.status(500).end(`Internal srever error: ${err.message}`);
}) as Express.ErrorRequestHandler);
