import _ from 'lodash';
import QueryString from 'querystring';
import fetch from 'node-fetch';
import * as Vts from 'vee-type-safe';

export type JsonRoot = Vts.BasicObject | any[];

export type QueryParamsObj = Vts.BasicObject<
    | string   | number   | boolean  
    | string[] | number[] | boolean[] 
>;

export interface GetJsonOptions {
    endpoint:      string;
    queryParams:   QueryParamsObj;
    jsonTypedescr: Vts.TypeDescription;
}

/**
 * Executes GET request with the given `query_params`.
 * 
 * @params query_params An object with keys as query keys and values as query values.
 *         Arrays are converted to comma delimited lists.
 * 
 * @throws Error | Vts.TypeMismatchError if network error occurs or
 *         `Vts.duckMismatch(fetchedJson, opts.json_typedescr) != null`
 * 
 */
export async function getJson<TJsonResponse extends JsonRoot>(
    {queryParams, endpoint, jsonTypedescr}: GetJsonOptions
) {
    const queryParamsString = QueryString.stringify(_.mapValues(
        queryParams, val => Array.isArray(val) ? val.join(',') : val
    ));
    const response = await fetch(
        `${endpoint}?${queryParamsString}`,
        { method: 'get' }
    );
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const jsonResponse = await response.json();
    Vts.ensureDuckMatch(jsonResponse, jsonTypedescr);
    return jsonResponse as TJsonResponse;
}