import * as Debug  from '@modules/debug';
import * as Path   from 'path';
import * as Config from '@app/config';
import { router as apiRouter } from '@routes/api';
import Express from 'express';
// import FacePlusPlus from '@modules/fpp-emotions';
//import * as BodyParser from 'body-parser';
  
Express()
//app.use(BodyParser.json());

.use(Express.static('./dist/'))
.use('/api/v1/', apiRouter)

.get('*', (_req, res) => {
    res.sendFile(Path.join(__dirname,`/../../dist/index.html`));
})

.use(((err, _req, res, _next) => {
    Debug.Log.error(err);
    return res.sendFile(Path.join(__dirname,`/../../dist/index.html`));
}) as Express.ErrorRequestHandler)

.listen(
    Config.Port,
    () => Debug.Log.info(`🚀  Server is listening on port ${Config.Port}`)
);