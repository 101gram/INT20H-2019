import * as Dotenv from 'dotenv';
import * as Fs     from 'fs';
import * as Path   from 'path';

Dotenv.load();

export namespace Flickr {
    export const ApiKey            = tryReadEnv('FLICKR_API_KEY');
    export const TargetPhotosetId  = '72157674388093532';
    export const TargetUserId      = '144522605@N06';
    export const TargetPhotoTag    = 'int20h';
}

export namespace FacePP {
    export interface APICredential {
        api_key:    string;
        api_secret: string;
    }
    export const APICredentials = new Array<APICredential>();

    let i = 0;          
    while (process.env[`FACEPP_API_KEY_${i}`   ] != null && 
           process.env[`FACEPP_API_SECRET_${i}`] != null) {
        APICredentials.push({
            api_key:    process.env[`FACEPP_API_KEY_${i}`   ]!,
            api_secret: process.env[`FACEPP_API_SECRET_${i}`]!
        });
        ++i;
    }
    export const QueryPerSecond = 1; 
}
export namespace Gql {
    export const Schema = Fs.readFileSync(relativeToRoot(
        'src/common/schema.graphql'
    )).toString();
}

export const Port        = tryReadEnv('PORT');
export const DatabaseUrl = tryReadEnv('DATABASE_URL');
export const DatabaseUpdateInterval = 300_000; // miliseconds

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
function relativeToRoot(dest: string) {
    return Path.join(Path.normalize(Path.join(__dirname, '../../')), dest);
}