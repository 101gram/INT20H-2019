export type Maybe<T> = T | null;

export interface GetPhotosRequest {
  /** Amount of photos per page. */
  limit: number;
  /** 0-based offset */
  offset: number;
  /** Search query. */
  search?: Maybe<GetPhotosSearch>;

  filter?: Maybe<GetPhotosFilter>;
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

/** Implementation detail */
export type TypeMatchedScalar = never;

/** ISO-8601 format compliant date-time string. */

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

/** Root queries endpoint. */
export interface Query {
  /** Search for photos with different filters. */
  getPhotos: GetPhotosResponse;
}

export interface GetPhotosResponse {
  /** Page of photos that satisfy input search limitations. */
  data: Photo[];
  /** Total amount of photos that may be queried for the given search limitations. */
  total: number;
}

export interface Photo {
  title: string;

  id: string;

  secret: string;

  server: string;

  farm: number;

  tag: boolean;

  photoset: boolean;

  emotions: Emotion[];
}

// ====================================================
// Arguments
// ====================================================

export interface GetPhotosQueryArgs {
  req: GetPhotosRequest;
}

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { Photo } from "@modules/graphql/codegen-mappers";

import { ResolveContext } from "@modules/graphql/codegen-mappers";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Root queries endpoint. */
export namespace QueryResolvers {
  export interface Resolvers<Context = ResolveContext, TypeParent = {}> {
    /** Search for photos with different filters. */
    getPhotos?: GetPhotosResolver<GetPhotosResponse, TypeParent, Context>;
  }

  export type GetPhotosResolver<
    R = GetPhotosResponse,
    Parent = {},
    Context = ResolveContext
  > = Resolver<R, Parent, Context, GetPhotosArgs>;
  export interface GetPhotosArgs {
    req: GetPhotosRequest;
  }
}

export namespace GetPhotosResponseResolvers {
  export interface Resolvers<
    Context = ResolveContext,
    TypeParent = GetPhotosResponse
  > {
    /** Page of photos that satisfy input search limitations. */
    data?: DataResolver<Photo[], TypeParent, Context>;
    /** Total amount of photos that may be queried for the given search limitations. */
    total?: TotalResolver<number, TypeParent, Context>;
  }

  export type DataResolver<
    R = Photo[],
    Parent = GetPhotosResponse,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
  export type TotalResolver<
    R = number,
    Parent = GetPhotosResponse,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
}

export namespace PhotoResolvers {
  export interface Resolvers<Context = ResolveContext, TypeParent = Photo> {
    title?: TitleResolver<string, TypeParent, Context>;

    id?: IdResolver<string, TypeParent, Context>;

    secret?: SecretResolver<string, TypeParent, Context>;

    server?: ServerResolver<string, TypeParent, Context>;

    farm?: FarmResolver<number, TypeParent, Context>;

    tag?: TagResolver<boolean, TypeParent, Context>;

    photoset?: PhotosetResolver<boolean, TypeParent, Context>;

    emotions?: EmotionsResolver<Emotion[], TypeParent, Context>;
  }

  export type TitleResolver<
    R = string,
    Parent = Photo,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
  export type IdResolver<
    R = string,
    Parent = Photo,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
  export type SecretResolver<
    R = string,
    Parent = Photo,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
  export type ServerResolver<
    R = string,
    Parent = Photo,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
  export type FarmResolver<
    R = number,
    Parent = Photo,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
  export type TagResolver<
    R = boolean,
    Parent = Photo,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
  export type PhotosetResolver<
    R = boolean,
    Parent = Photo,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
  export type EmotionsResolver<
    R = Emotion[],
    Parent = Photo,
    Context = ResolveContext
  > = Resolver<R, Parent, Context>;
}

/** Requires an integer within the range [1, +Infinity) */
export type PositiveIntDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  {},
  ResolveContext
>; /** Requires an integer within the range [0, +Infinity) */
export type ZeroOrPositiveIntDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  {},
  ResolveContext
>; /** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  ResolveContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  ResolveContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  ResolveContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface TypeMatchedScalarScalarConfig
  extends GraphQLScalarTypeConfig<TypeMatchedScalar, any> {
  name: "TypeMatchedScalar";
}
export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: "Date";
}

export interface IResolvers<Context = ResolveContext> {
  Query?: QueryResolvers.Resolvers<Context>;
  GetPhotosResponse?: GetPhotosResponseResolvers.Resolvers<Context>;
  Photo?: PhotoResolvers.Resolvers<Context>;
  TypeMatchedScalar?: GraphQLScalarType;
  Date?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  positiveInt?: PositiveIntDirectiveResolver<Result>;
  zeroOrPositiveInt?: ZeroOrPositiveIntDirectiveResolver<Result>;
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
