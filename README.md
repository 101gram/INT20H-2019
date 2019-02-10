# INT20H-2019

[Link to Emotion Picker](https://emotionpicker.herokuapp.com/)

This website was made as a test assignment for
[INT20H hackaton 2019](http://int20h.best-kyiv.org/)

HOWTO run the project locally:

1. Put `.env` file in the root of project with the following environment variables:
    * `PORT` - port that server will start at
    * `FLICKR_API_KEY` - api key from *Flickr*
    * `FACEAPP_API_KEY_0` - api key from *Face++*
    * `FACEAPP_API_SECRET_0` - api secret from *Face++*
2. Build project.
```bash
npm run build:prod
```
3. Run server.API
```bash
npm start
```