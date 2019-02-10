# INT20H-2019

## [Link to Emotion Picker](https://emotionpicker.herokuapp.com/)

This website was made as a test assignment for
[INT20H hackaton 2019](http://int20h.best-kyiv.org/)

### HOWTO run the project locally

1. Put `.env` file in the root of project with the following environment variables:
    * `PORT` - port that server will start at
    * `FLICKR_API_KEY` - API key from [Flickr](https://www.flickr.com/services/api/)
    * `FACEAPP_API_KEY_0` - API key from [Face++](https://www.faceplusplus.com/)
    * `FACEAPP_API_SECRET_0` - API secret from [Face++](https://www.faceplusplus.com/)
    * `DATABASE_URL` - running MongoDB instance url (either local or remote).

View `EXAMPLE_DOTENV.env` for an example.

2.Install necessary dependencies

```bash
npm install
```

3. Build project.

```bash
npm run build:prod
```

4. Run server.

```bash
npm start
```
