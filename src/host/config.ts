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
    export const ApiKey    = tryReadEnv('FACEPP_API_KEY');
    export const ApiSecret = tryReadEnv('FACEPP_API_SECRET');
    export const QueryPerSecond = 1; 
}
export namespace Gql {
    export const Schema = Fs.readFileSync(relativeToRoot(
        'src/common/schema.graphql'
    )).toString();
}

export const Port        = tryReadEnv('PORT');
export const DatabaseUrl = tryReadEnv('DATABASE_URL');


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