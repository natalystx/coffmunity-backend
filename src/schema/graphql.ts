
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

export class User {
    id: string;
    fullName: string;
    image?: Nullable<string>;
    username: string;
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
}

export abstract class IMutation {
    abstract createUser(createUserInput?: Nullable<CreateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(updateUserInput?: Nullable<UpdateUserInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: string): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;

    abstract createRecipe(createRecipeInput?: Nullable<CreateRecipeInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;

    abstract updateRecipe(updateRecipeInput?: Nullable<UpdateRecipeInput>): Nullable<Recipe> | Promise<Nullable<Recipe>>;

    abstract deleteRecipe(deleteRecipeInput: DeleteRecipeInput): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;

    abstract likeRecipe(likeRecipeInput?: Nullable<LikeRecipeInput>): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;

    abstract dislikeRecipe(dislikeRecipeInput?: Nullable<DisLikeRecipeInput>): Nullable<ActionResponse> | Promise<Nullable<ActionResponse>>;
}

type Nullable<T> = T | null;
