/* eslint-disable @typescript-eslint/ban-types */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type ActionResponse = {
  __typename?: 'ActionResponse';
  success: Scalars['Boolean'];
};

export type AddRecipeToListInput = {
  listId: Scalars['String'];
  recipeId: Scalars['String'];
};

export type BeanDetail = {
  __typename?: 'BeanDetail';
  origin?: Maybe<Scalars['String']>;
  process: Scalars['String'];
  productUrl?: Maybe<Scalars['String']>;
  roastLevel?: Maybe<Scalars['String']>;
  tasteNotes: Array<Maybe<Scalars['String']>>;
  varieties?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type BeanDetailInput = {
  origin?: InputMaybe<Scalars['String']>;
  process: Scalars['String'];
  productUrl?: InputMaybe<Scalars['String']>;
  roastLevel?: InputMaybe<Scalars['String']>;
  tasteNotes: Array<InputMaybe<Scalars['String']>>;
  varieties?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Brew = {
  __typename?: 'Brew';
  description?: Maybe<Scalars['String']>;
  step: Scalars['Int'];
  time: Scalars['Int'];
  waterAmount: Scalars['Float'];
};

export type BrewInput = {
  description?: InputMaybe<Scalars['String']>;
  step: Scalars['Int'];
  time: Scalars['Int'];
  waterAmount: Scalars['Float'];
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String'];
  commentToNode?: Maybe<Scalars['String']>;
  createBy: Scalars['String'];
  createdTime: Scalars['Date'];
  id: Scalars['String'];
};

export type CommentInput = {
  comment: Scalars['String'];
  commentToNode: Scalars['String'];
  createBy: Scalars['String'];
};

export type CreateRecipeInput = {
  beanDetail: BeanDetailInput;
  brewMethod: Scalars['String'];
  createBy: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  detail: RecipeDetailInput;
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
};

export type CreateSavedListInput = {
  createBy?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  fullName: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type DeleteCommentInput = {
  commentToNode: Scalars['String'];
  createBy: Scalars['String'];
  id: Scalars['String'];
};

export type DeleteRecipeInput = {
  recipeId: Scalars['String'];
  username: Scalars['String'];
};

export type DeleteSavedListInput = {
  createBy: Scalars['String'];
  listId: Scalars['String'];
};

export type DisLikeRecipeInput = {
  recipeId: Scalars['String'];
  username: Scalars['String'];
};

export type EditCommentInput = {
  comment: Scalars['String'];
  id: Scalars['String'];
};

export type FollowUserInput = {
  followUser: Scalars['String'];
  myUsername: Scalars['String'];
};

export type IsDislike = {
  __typename?: 'IsDislike';
  dislike: Scalars['Boolean'];
};

export type IsLike = {
  __typename?: 'IsLike';
  like: Scalars['Boolean'];
};

export type LikeRecipeInput = {
  recipeId: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecipeToList?: Maybe<SavedList>;
  createComment: Comment;
  createRecipe?: Maybe<Recipe>;
  createSavedList?: Maybe<SavedList>;
  createUser?: Maybe<User>;
  deleteComment?: Maybe<ActionResponse>;
  deleteRecipe?: Maybe<ActionResponse>;
  deleteSavedList?: Maybe<ActionResponse>;
  deleteUser?: Maybe<ActionResponse>;
  dislikeRecipe?: Maybe<ActionResponse>;
  editComment?: Maybe<Comment>;
  followUser?: Maybe<ActionResponse>;
  likeRecipe?: Maybe<ActionResponse>;
  removeRecipeToList?: Maybe<SavedList>;
  updateRecipe?: Maybe<Recipe>;
  updateUser?: Maybe<User>;
  updateUsernameAlias?: Maybe<User>;
};

export type MutationAddRecipeToListArgs = {
  addRecipeToListInput?: InputMaybe<AddRecipeToListInput>;
};

export type MutationCreateCommentArgs = {
  commentInput?: InputMaybe<CommentInput>;
};

export type MutationCreateRecipeArgs = {
  createRecipeInput?: InputMaybe<CreateRecipeInput>;
};

export type MutationCreateSavedListArgs = {
  createSavedListInput?: InputMaybe<CreateSavedListInput>;
};

export type MutationCreateUserArgs = {
  createUserInput?: InputMaybe<CreateUserInput>;
};

export type MutationDeleteCommentArgs = {
  deleteCommentInput?: InputMaybe<DeleteCommentInput>;
};

export type MutationDeleteRecipeArgs = {
  deleteRecipeInput: DeleteRecipeInput;
};

export type MutationDeleteSavedListArgs = {
  deleteSavedListInput?: InputMaybe<DeleteSavedListInput>;
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationDislikeRecipeArgs = {
  dislikeRecipeInput?: InputMaybe<DisLikeRecipeInput>;
};

export type MutationEditCommentArgs = {
  editCommentInput?: InputMaybe<EditCommentInput>;
};

export type MutationFollowUserArgs = {
  followUserInput?: InputMaybe<FollowUserInput>;
};

export type MutationLikeRecipeArgs = {
  likeRecipeInput?: InputMaybe<LikeRecipeInput>;
};

export type MutationRemoveRecipeToListArgs = {
  removeRecipeToListInput?: InputMaybe<RemoveRecipeToListInput>;
};

export type MutationUpdateRecipeArgs = {
  updateRecipeInput?: InputMaybe<UpdateRecipeInput>;
};

export type MutationUpdateUserArgs = {
  updateUserInput?: InputMaybe<UpdateUserInput>;
};

export type MutationUpdateUsernameAliasArgs = {
  updateUsernameAliasInput?: InputMaybe<UpdateUsernameAliasInput>;
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Maybe<Comment>>;
  didDislikeRecipe?: Maybe<IsDislike>;
  didLikeRecipe?: Maybe<IsLike>;
  recipe?: Maybe<Recipe>;
  recipes?: Maybe<Array<Maybe<Recipe>>>;
  savedListById?: Maybe<SavedList>;
  savedLists?: Maybe<Array<Maybe<SavedList>>>;
  user?: Maybe<User>;
  userRecipe?: Maybe<Array<Maybe<Recipe>>>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type QueryCommentsArgs = {
  nodeId: Scalars['String'];
};

export type QueryDidDislikeRecipeArgs = {
  checkRecipeDislikeInput?: InputMaybe<DisLikeRecipeInput>;
};

export type QueryDidLikeRecipeArgs = {
  checkRecipeLikeInput?: InputMaybe<LikeRecipeInput>;
};

export type QueryRecipeArgs = {
  recipeId: Scalars['String'];
};

export type QuerySavedListByIdArgs = {
  listId: Scalars['String'];
};

export type QuerySavedListsArgs = {
  username: Scalars['String'];
};

export type QueryUserArgs = {
  username: Scalars['String'];
};

export type QueryUserRecipeArgs = {
  username: Scalars['String'];
};

export type Recipe = {
  __typename?: 'Recipe';
  beanDetail: BeanDetail;
  createBy: Scalars['String'];
  createdTime: Scalars['Date'];
  description: Scalars['String'];
  detail: RecipeDetail;
  dislikes?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  images?: Maybe<Array<Maybe<Scalars['String']>>>;
  likes?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
};

export type RecipeDetail = {
  __typename?: 'RecipeDetail';
  grindSize: Scalars['Float'];
  groundCoffeeAmount: Scalars['Float'];
  ratio: Scalars['String'];
  steps: Array<Maybe<Brew>>;
  tds?: Maybe<Scalars['Int']>;
  temperature: Scalars['Float'];
  totalTime: Scalars['Int'];
  totalYield: Scalars['Float'];
};

export type RecipeDetailInput = {
  grindSize: Scalars['Float'];
  groundCoffeeAmount: Scalars['Float'];
  ratio: Scalars['String'];
  steps: Array<InputMaybe<BrewInput>>;
  tds?: InputMaybe<Scalars['Int']>;
  temperature: Scalars['Float'];
  totalTime: Scalars['Int'];
  totalYield: Scalars['Float'];
};

export type RemoveRecipeToListInput = {
  listId: Scalars['String'];
  recipeId: Scalars['String'];
};

export type SavedList = {
  __typename?: 'SavedList';
  createBy: Scalars['String'];
  createdTime: Scalars['Date'];
  id: Scalars['String'];
  name: Scalars['String'];
  saveRecipeIds: Array<Maybe<Scalars['String']>>;
};

export type UpdateRecipeInput = {
  beanDetail?: InputMaybe<BeanDetailInput>;
  description?: InputMaybe<Scalars['String']>;
  detail?: InputMaybe<RecipeDetailInput>;
  id: Scalars['String'];
  images?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  fullName: Scalars['String'];
  id: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
};

export type UpdateUsernameAliasInput = {
  username: Scalars['String'];
  usernameAlias: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdTime: Scalars['Date'];
  followers?: Maybe<Scalars['Int']>;
  fullName: Scalars['String'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  usernameAlias?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ActionResponse: ResolverTypeWrapper<ActionResponse>;
  AddRecipeToListInput: AddRecipeToListInput;
  BeanDetail: ResolverTypeWrapper<BeanDetail>;
  BeanDetailInput: BeanDetailInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Brew: ResolverTypeWrapper<Brew>;
  BrewInput: BrewInput;
  Comment: ResolverTypeWrapper<Comment>;
  CommentInput: CommentInput;
  CreateRecipeInput: CreateRecipeInput;
  CreateSavedListInput: CreateSavedListInput;
  CreateUserInput: CreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteCommentInput: DeleteCommentInput;
  DeleteRecipeInput: DeleteRecipeInput;
  DeleteSavedListInput: DeleteSavedListInput;
  DisLikeRecipeInput: DisLikeRecipeInput;
  EditCommentInput: EditCommentInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  FollowUserInput: FollowUserInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IsDislike: ResolverTypeWrapper<IsDislike>;
  IsLike: ResolverTypeWrapper<IsLike>;
  LikeRecipeInput: LikeRecipeInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Recipe: ResolverTypeWrapper<Recipe>;
  RecipeDetail: ResolverTypeWrapper<RecipeDetail>;
  RecipeDetailInput: RecipeDetailInput;
  RemoveRecipeToListInput: RemoveRecipeToListInput;
  SavedList: ResolverTypeWrapper<SavedList>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateRecipeInput: UpdateRecipeInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUsernameAliasInput: UpdateUsernameAliasInput;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ActionResponse: ActionResponse;
  AddRecipeToListInput: AddRecipeToListInput;
  BeanDetail: BeanDetail;
  BeanDetailInput: BeanDetailInput;
  Boolean: Scalars['Boolean'];
  Brew: Brew;
  BrewInput: BrewInput;
  Comment: Comment;
  CommentInput: CommentInput;
  CreateRecipeInput: CreateRecipeInput;
  CreateSavedListInput: CreateSavedListInput;
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date'];
  DeleteCommentInput: DeleteCommentInput;
  DeleteRecipeInput: DeleteRecipeInput;
  DeleteSavedListInput: DeleteSavedListInput;
  DisLikeRecipeInput: DisLikeRecipeInput;
  EditCommentInput: EditCommentInput;
  Float: Scalars['Float'];
  FollowUserInput: FollowUserInput;
  Int: Scalars['Int'];
  IsDislike: IsDislike;
  IsLike: IsLike;
  LikeRecipeInput: LikeRecipeInput;
  Mutation: {};
  Query: {};
  Recipe: Recipe;
  RecipeDetail: RecipeDetail;
  RecipeDetailInput: RecipeDetailInput;
  RemoveRecipeToListInput: RemoveRecipeToListInput;
  SavedList: SavedList;
  String: Scalars['String'];
  UpdateRecipeInput: UpdateRecipeInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUsernameAliasInput: UpdateUsernameAliasInput;
  User: User;
}>;

export type ActionResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ActionResponse'] = ResolversParentTypes['ActionResponse'],
> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BeanDetailResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['BeanDetail'] = ResolversParentTypes['BeanDetail'],
> = ResolversObject<{
  origin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  process?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productUrl?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  roastLevel?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  tasteNotes?: Resolver<
    Array<Maybe<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  varieties?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BrewResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Brew'] = ResolversParentTypes['Brew'],
> = ResolversObject<{
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  step?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  waterAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment'],
> = ResolversObject<{
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  commentToNode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type IsDislikeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['IsDislike'] = ResolversParentTypes['IsDislike'],
> = ResolversObject<{
  dislike?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type IsLikeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['IsLike'] = ResolversParentTypes['IsLike'],
> = ResolversObject<{
  like?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = ResolversObject<{
  addRecipeToList?: Resolver<
    Maybe<ResolversTypes['SavedList']>,
    ParentType,
    ContextType,
    Partial<MutationAddRecipeToListArgs>
  >;
  createComment?: Resolver<
    ResolversTypes['Comment'],
    ParentType,
    ContextType,
    Partial<MutationCreateCommentArgs>
  >;
  createRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    Partial<MutationCreateRecipeArgs>
  >;
  createSavedList?: Resolver<
    Maybe<ResolversTypes['SavedList']>,
    ParentType,
    ContextType,
    Partial<MutationCreateSavedListArgs>
  >;
  createUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    Partial<MutationCreateUserArgs>
  >;
  deleteComment?: Resolver<
    Maybe<ResolversTypes['ActionResponse']>,
    ParentType,
    ContextType,
    Partial<MutationDeleteCommentArgs>
  >;
  deleteRecipe?: Resolver<
    Maybe<ResolversTypes['ActionResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteRecipeArgs, 'deleteRecipeInput'>
  >;
  deleteSavedList?: Resolver<
    Maybe<ResolversTypes['ActionResponse']>,
    ParentType,
    ContextType,
    Partial<MutationDeleteSavedListArgs>
  >;
  deleteUser?: Resolver<
    Maybe<ResolversTypes['ActionResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, 'id'>
  >;
  dislikeRecipe?: Resolver<
    Maybe<ResolversTypes['ActionResponse']>,
    ParentType,
    ContextType,
    Partial<MutationDislikeRecipeArgs>
  >;
  editComment?: Resolver<
    Maybe<ResolversTypes['Comment']>,
    ParentType,
    ContextType,
    Partial<MutationEditCommentArgs>
  >;
  followUser?: Resolver<
    Maybe<ResolversTypes['ActionResponse']>,
    ParentType,
    ContextType,
    Partial<MutationFollowUserArgs>
  >;
  likeRecipe?: Resolver<
    Maybe<ResolversTypes['ActionResponse']>,
    ParentType,
    ContextType,
    Partial<MutationLikeRecipeArgs>
  >;
  removeRecipeToList?: Resolver<
    Maybe<ResolversTypes['SavedList']>,
    ParentType,
    ContextType,
    Partial<MutationRemoveRecipeToListArgs>
  >;
  updateRecipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    Partial<MutationUpdateRecipeArgs>
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    Partial<MutationUpdateUserArgs>
  >;
  updateUsernameAlias?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    Partial<MutationUpdateUsernameAliasArgs>
  >;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = ResolversObject<{
  comments?: Resolver<
    Array<Maybe<ResolversTypes['Comment']>>,
    ParentType,
    ContextType,
    RequireFields<QueryCommentsArgs, 'nodeId'>
  >;
  didDislikeRecipe?: Resolver<
    Maybe<ResolversTypes['IsDislike']>,
    ParentType,
    ContextType,
    Partial<QueryDidDislikeRecipeArgs>
  >;
  didLikeRecipe?: Resolver<
    Maybe<ResolversTypes['IsLike']>,
    ParentType,
    ContextType,
    Partial<QueryDidLikeRecipeArgs>
  >;
  recipe?: Resolver<
    Maybe<ResolversTypes['Recipe']>,
    ParentType,
    ContextType,
    RequireFields<QueryRecipeArgs, 'recipeId'>
  >;
  recipes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Recipe']>>>,
    ParentType,
    ContextType
  >;
  savedListById?: Resolver<
    Maybe<ResolversTypes['SavedList']>,
    ParentType,
    ContextType,
    RequireFields<QuerySavedListByIdArgs, 'listId'>
  >;
  savedLists?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['SavedList']>>>,
    ParentType,
    ContextType,
    RequireFields<QuerySavedListsArgs, 'username'>
  >;
  user?: Resolver<
    Maybe<ResolversTypes['User']>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'username'>
  >;
  userRecipe?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Recipe']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryUserRecipeArgs, 'username'>
  >;
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['User']>>>,
    ParentType,
    ContextType
  >;
}>;

export type RecipeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Recipe'] = ResolversParentTypes['Recipe'],
> = ResolversObject<{
  beanDetail?: Resolver<ResolversTypes['BeanDetail'], ParentType, ContextType>;
  createBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  detail?: Resolver<ResolversTypes['RecipeDetail'], ParentType, ContextType>;
  dislikes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  likes?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RecipeDetailResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RecipeDetail'] = ResolversParentTypes['RecipeDetail'],
> = ResolversObject<{
  grindSize?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  groundCoffeeAmount?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  ratio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  steps?: Resolver<
    Array<Maybe<ResolversTypes['Brew']>>,
    ParentType,
    ContextType
  >;
  tds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  temperature?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalYield?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SavedListResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['SavedList'] = ResolversParentTypes['SavedList'],
> = ResolversObject<{
  createBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  saveRecipeIds?: Resolver<
    Array<Maybe<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = ResolversObject<{
  createdTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  followers?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  usernameAlias?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  ActionResponse?: ActionResponseResolvers<ContextType>;
  BeanDetail?: BeanDetailResolvers<ContextType>;
  Brew?: BrewResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Date?: GraphQLScalarType;
  IsDislike?: IsDislikeResolvers<ContextType>;
  IsLike?: IsLikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recipe?: RecipeResolvers<ContextType>;
  RecipeDetail?: RecipeDetailResolvers<ContextType>;
  SavedList?: SavedListResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;
