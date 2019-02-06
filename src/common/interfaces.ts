import { Maybe } from 'vee-type-safe';
export { Maybe } from 'vee-type-safe';

export type Callback<TResult> = (err: unknown, result: Maybe<TResult>) => void;

export interface Object<TValue> { 
    [key: string]: TValue;
}