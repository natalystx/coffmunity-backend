
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    fullName: string;
    image?: Nullable<string>;
    username: string;
}

export class UpdateUserInput {
    id: string;
    fullName: string;
    image?: Nullable<string>;
}

export class BrewInput {
    step: number;
    waterAmount: number;
    time: number;
    description?: Nullable<string>;
}

export class RecipeDetailInput {
    groundCoffeeAmount: number;
    ratio: string;
    totalTime: number;
    grindSize: number;
    temperature: number;
    totalYield: number;
    steps: Nullable<BrewInput>[];
    tds?: Nullable<number>;
}

export class CreateRecipeInput {
    images?: Nullable<Nullable<string>[]>;
    createBy: string;
    title: string;
    description?: Nullable<string>;
    detail: RecipeDetailInput;
    beanDetail: BeanDetailInput;
    brewMethod: string;
}

export class BeanDetailInput {
    process: string;
    roastLevel?: Nullable<string>;
    tasteNotes: Nullable<string>[];
    origin?: Nullable<string>;
    varieties?: Nullable<Nullable<string>[]>;
    productUrl?: Nullable<string>;
}

export class UpdateRecipeInput {
    id: string;
    images?: Nullable<Nullable<string>[]>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    detail?: Nullable<RecipeDetailInput>;
    beanDetail?: Nullable<BeanDetailInput>;
}

export class LikeRecipeInput {
    username: string;
    recipeId: string;
}

export class DisLikeRecipeInput {
    username: string;
    recipeId: string;
}

export class DeleteRecipeInput {
    username: string;
    recipeId: string;
}

export class FollowUserInput {
    myUsername: string;
    followUser: string;
}

export class CommentInput {
    comment: string;
    createBy: string;
    commentToNode: string;
}

export class DeleteCommentInput {
    id: string;
    createBy: string;
    commentToNode: string;
}

export class EditCommentInput {
    id: string;
    comment: string;
}

export class CreateSavedListInput {
    createBy?: Nullable<string>;
    name?: Nullable<string>;
}

export class AddRecipeToListInput {
    listId: string;
    recipeId: string;
}

export class RemoveRecipeToListInput {
    listId: string;
    recipeId: string;
}

export class DeleteSavedListInput {
    listId: string;
    createBy: string;
}

export class UpdateUsernameAliasInput {
    username: string;
    usernameAlias: string;
}

export class User {
    id: string;
    fullName: string;
    image?: Nullable<string>;
    username: string;
    followers?: Nullable<number>;
    createdTime: Date;
    usernameAlias?: Nullable<string>;
}

export class ActionResponse {
    success: boolean;
}

export class Brew {
    step: number;
    waterAmount: number;
    time: number;
    description?: Nullable<string>;
}

export class RecipeDetail {
    groundCoffeeAmount: number;
    ratio: string;
    totalTime: number;
    grindSize: number;
    temperature: number;
    totalYield: number;
    steps: Nullable<Brew>[];
    tds?: Nullable<number>;
}

export class BeanDetail {
    process: string;
    roastLevel?: Nullable<string>;
    tasteNotes: Nullable<string>[];
    origin?: Nullable<string>;
    varieties?: Nullable<Nullable<string>[]>;
    productUrl?: Nullable<string>;
}

export class Recipe {
    id: string;
    images?: Nullable<Nullable<string>[]>;
    createBy: string;
    title: string;
    description: string;
    detail: RecipeDetail;
    likes?: Nullable<number>;
    dislikes?: Nullable<number>;
    beanDetail: BeanDetail;
    createdTime: Date;
}

export class IsLike {
    like: boolean;
}

export class IsDislike {
    dislike: boolean;
}

export abstract class IQuery {
    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(username: string): Nullable<User> | Promise<Nullable<User>>;

    abstract recipes(): Nullable<Nullable<Recipe>[]> | Promise<Nullable<Nullable<Recipe>[]>>;

    abstract userRecipe(username: string): Nullable<Nullable<Recipe>[]> | Promise<Nullable<Nullable<Recipe>[]>>;

    abstract recipe(recipeId: string): Nullable<Recipe> | Promise<Nullable<Recipe>>;

    abstract didLikeRecipe(checkRecipeLikeInput?: Nullable<LikeRecipeInput>): Nullable<IsLike> | Promise<Nullable<IsLike>>;

    abstract didDislikeRecipe(checkRecipeDislikeInput?: Nullable<DisLikeRecipeInput>): Nullable<IsDislike> | Promise<Nullable<IsDislike>>;

    abstract comments(nodeId: string): Nullable<Comment>[] | Promise<Nullable<Comment>[]>;

    abstract savedLists(username: string): Nullable<Nullable<SavedList>[]> | Promise<Nullable<Nullable<SavedList>[]>>;

    abstract savedListById(listId: string): Nullable<SavedList> | Promise<Nullable<SavedList>>;
}

export class Comment {
    id: string;
    comment: string;
    createBy: string;
    commentToNode?: Nullable<string>;
    createdTime: Date;
}

export class SavedList {
    id: string;
    name: string;
    saveRecipeIds: Nullable<string>[];
    createBy: string;
    createdTime: Date;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUsernameAlias(updateUsernameAliasInput?: Nullable<UpdateUsernameAliasInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;

    abstract createRecipe(createRecipeInput?: Nullable<CreateRecipeInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;

    abstract updateRecipe(updateRecipeInput?: Nullable<UpdateRecipeInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;

    abstract deleteRecipe(deleteRecipeInput: DeleteRecipeInput): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;

    abstract likeRecipe(likeRecipeInput?: Nullable<LikeRecipeInput>): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;

    abstract dislikeRecipe(dislikeRecipeInput?: Nullable<DisLikeRecipeInput>): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;

    abstract followUser(followUserInput?: Nullable<FollowUserInput>): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;

    abstract createComment(commentInput?: Nullable<CommentInput>): Comment | Promise<Comment>;

    abstract deleteComment(deleteCommentInput?: Nullable<DeleteCommentInput>): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;

    abstract editComment(editCommentInput?: Nullable<EditCommentInput>): Nullable<Comment> | Promise<Nullable<Comment>>;

    abstract createSavedList(createSavedListInput?: Nullable<CreateSavedListInput>): Nullable<SavedList> | Promise<Nullable<SavedList>>;

    abstract addRecipeToList(addRecipeToListInput?: Nullable<AddRecipeToListInput>): Nullable<SavedList> | Promise<Nullable<SavedList>>;

    abstract removeRecipeToList(removeRecipeToListInput?: Nullable<RemoveRecipeToListInput>): Nullable<SavedList> | Promise<Nullable<SavedList>>;

    abstract deleteSavedList(deleteSavedListInput?: Nullable<DeleteSavedListInput>): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;
}

type Nullable<T> = T | null;
