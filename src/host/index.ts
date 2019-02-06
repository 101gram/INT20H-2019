import * as Debug from '@modules/debug';
import Express = require('express');
import * as Path from 'path';
import * as Flickr from 'flickrapi';
import * as Config from '@app/config';

Flickr.authenticate({
    api_key:             Config.Flickr.ApiKey,
    secret:              Config.Flickr.ApiSecret,
    user_id:             Config.Flickr.UserId,
    access_token:        Config.Flickr.AccessToken,
    access_token_secret: Config.Flickr.AccessTokenSecret   
}, (error, flickr) => {   
    if (error) {
        Debug.shutdown(error, 'Falield to authenticate on Flickr');
    }
    const app = Express(); 

    flickr!.proxy(app, "/api/proxy/flickr");

    app.use(Express.static('./dist/'));
    app.use(Express.static('./node_modules/react/umd/'));
    app.use(Express.static('./node_modules/react-dom/umd/'));

    app.get('*', (_req, res) => {
        res.sendFile(Path.join(`${__dirname}/src/index.html`));
    });

    app.use(((err, _req, res, _next) => {
        Debug.Log.error(err);
        return res.status(500).end(`Internal srever error: ${err.message}`);
    }) as Express.ErrorRequestHandler);


    app.listen(
        Config.Port,
        () => Debug.Log.info(`🚀  Server is listening on port ${Config.Port}`)
    );
});