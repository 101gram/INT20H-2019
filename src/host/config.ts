import * as Dotenv from 'dotenv';

Dotenv.load();

export const FlickrApiKey   = tryReadEnv('API_KEY');
export const FlickrApiScret = tryReadEnv('API_SECRET');
export const Port           = tryReadEnv('PORT');



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