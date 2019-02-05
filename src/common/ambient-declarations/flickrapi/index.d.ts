declare module 'flickrapi' {
    import { Maybe } from 'vee-type-safe';
    import * as Express from 'express';

    export interface FlikrProxy {
        proxy(app: Express.Application, path: string): void;
    }

    // For backend:
    export function authenticate(
        options:  FlickrAuthOptions, 
        callback: Callback<FlickrProxy>
    ): void;
    
    interface FlickrAuthOptions {
        api_key:  string;             // "your api key from flickr",
        secret:   string;             // "your api key secret from flickr",
        user_id?: string;             // negotiated through first-time authenticate() call
        access_token?: string;        // negotiated through first-time authenticate() call
        access_token_secret?: string; // negotiated through first-time authenticate() call
        // requestOptions: "object containing any value accepted by request.defaults()" optional
    }

    
}