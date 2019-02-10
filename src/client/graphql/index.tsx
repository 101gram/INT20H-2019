export type Maybe<T> = T | null;

export interface GetPhotosRequest {
  /** Amount of photos per page. */
  limit: number;
  /** 0-based offset */
  offset: number;
  /** Search query. */
  search?: Maybe<GetPhotosSearch>;

  filter?: Maybe<GetPhotosFilter>;

  sort?: Maybe<GetPhotosSort>;
}

export interface GetPhotosSearch {
  title?: Maybe<string>;
}

export interface GetPhotosFilter {
  /** prevails over `exclude` */
  include?: Maybe<GetPhotosFilterData>;
  /** inferior to `include` */
  exclude?: Maybe<GetPhotosFilterData>;
}

export interface GetPhotosFilterData {
  title?: Maybe<string[]>;

  tag?: Maybe<boolean>;

  photoset?: Maybe<boolean>;

  emotions?: Maybe<Emotion[]>;
}

export interface GetPhotosSort {
  datetaken: SortingOrder;
}
/** Possible emotions that detects face++ API. */
export enum Emotion {
  Sadness = "sadness",
  Neutral = "neutral",
  Disgust = "disgust",
  Anger = "anger",
  Surprise = "surprise",
  Fear = "fear",
  Happiness = "happiness"
}

export enum SortingOrder {
  Asc = "asc",
  Desc = "desc"
}

/** ISO-8601 format compliant date-time string. */
export type Date = string;

/** Implementation detail */
export type TypeMatchedScalar = never;

// ====================================================
// Documents
// ====================================================

export namespace QueryPhotos {
  export type Variables = {
    req: GetPhotosRequest;
  };

  export type Query = {
    __typename?: "Query";

    getPhotos: GetPhotos;
  };

  export type GetPhotos = {
    __typename?: "GetPhotosResponse";

    total: number;

    data: Data[];
  };

  export type Data = {
    __typename?: "Photo";

    title: string;

    id: string;

    secret: string;

    server: string;

    farm: number;

    tag: boolean;

    photoset: boolean;

    emotions: Emotion[];

    datetaken: string;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace QueryPhotos {
  export const Document = gql`
    query queryPhotos($req: GetPhotosRequest!) {
      getPhotos(req: $req) {
        total
        data {
          title
          id
          secret
          server
          farm
          tag
          photoset
          emotions
          datetaken
        }
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
