import * as Dotenv from 'dotenv';

Dotenv.load();

export namespace Flickr {
    export const ApiKey            = tryReadEnv('FLICKR_API_KEY');
    export const ApiSecret         = tryReadEnv('FLICKR_API_SECRET');
    export const UserId            = tryReadEnv('FLICKR_USER_ID');
    export const AccessToken       = tryReadEnv('FLICKR_ACCESS_TOKEN');
    export const AccessTokenSecret = tryReadEnv('FLICKR_ACCESS_TOKEN_SECRET');
}

export const Port = tryReadEnv('PORT');


function tryReadEnv(variableId: string, defaultVal?: string) {
    if (!(variableId in process.env)) {
        if (defaultVal) {
            return defaultVal;
        }
        throw new Error(
            `failed to read '${variableId}' environment variable`
        );
    }
    return process.env[variableId]!;
}