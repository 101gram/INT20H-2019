import * as Debug from '@modules/debug';
import Express = require('express');
import * as Path from 'path';
import * as Flickr from 'flickrapi';
import * as Config from '@app/config';
import Axios from 'axios';
import FormData from 'form-data';
import * as BodyParser from 'body-parser';
import { Object } from '@common/interfaces';
import * as Vts from 'vee-type-safe';

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

    app.use(BodyParser.json());

    flickr!.proxy(app, "/api/proxy/flickr");

    app.post('/api/facepp/test', async (req, res) => {
        const mismatchInfo = Vts.mismatch(
            req.body,
            {
                image_url: 'string', 
                return_landmark: 'string',                
                return_attributes: 'string'             
            }
        );
        Debug.Log.info(mismatchInfo ? mismatchInfo.toErrorString() : "norma");
        if (mismatchInfo !== null) {
            return res.status(400).end(mismatchInfo.toErrorString());
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const body = new FormData();
        const body_data: Object<string> = {
            api_key: Config.FacePP.ApiKey,
            api_secret: Config.FacePP.ApiSecret,
            image_url: req.body.image_url,
            return_landmark: req.body.return_landmark,
            return_attributes: req.body.return_attributes
        };
        for (const key in body_data) {
            body.append(key, body_data[key]);
        }
        try {
            const response = await Axios.post(
                'https://api-us.faceplusplus.com/facepp/v3/detect',
                body,
                config
            );
            res.send(response);
        } catch(e) {
            Debug.Log.info(e.message);
            res.status(400).end(e.message);
        }
    });

    app.use(Express.static('./dist/'));

    app.get('*', (_req, res) => {
        res.sendFile(Path.join(`${__dirname}`,`/../../dist/index.html`));
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