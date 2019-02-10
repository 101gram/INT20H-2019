import Mongoose from 'mongoose';
import * as Debug  from '@modules/debug';
import * as Path   from 'path';
import * as Config from '@app/config';
// import * as Utils  from '@modules/utils';
import { router as apiRouter } from '@routes/api';
import { apolloServer        } from '@routes/graphql';
import Express from 'express';
// import { Photo } from '@models/photo';
  
const app = Express()

.use(Express.static('./dist/'));

apolloServer.applyMiddleware({
    app,
    path: '/graphql'
});


app
.use('/api/v1', apiRouter)

.get('*', (_req, res) => { 
    res.sendFile(Path.join(__dirname,`/../../dist/index.html`));
}) 
    
.use(((err, _req, res, _next) => {
    Debug.Log.error(err);
    return res.sendFile(Path.join(__dirname,`/../../dist/index.html`));
}) as Express.ErrorRequestHandler);
 
Mongoose.connect(Config.DatabaseUrl, { 
    useNewUrlParser:  true,
    keepAlive:        true, 
    useCreateIndex:   true, 
    connectTimeoutMS: 30000 
})
.then(async () => { 
    app.listen(
        Config.Port,
        () => Debug.Log.info(`🚀  Server is listening on port ${Config.Port}`)
    );
    // await Utils.measurePerformance(() => Photo.updateDatabase(), 'updateDatabase()');
})
.catch(err => {
    Debug.Log.error(err);
    process.exit(1);
});
 
// Close DB connection when shutting down manually
process.on('SIGINT', () => Mongoose.disconnect().finally(() => process.exit(0)));