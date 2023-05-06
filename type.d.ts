import { BeanDetail } from 'src/domains/recipe/recipe.entity';

export type CreateUserInput = {
  fullName: string;
  image?: string;
  username: string;
};

export type UpdateUserInput = {
  id: string;
  fullName: string;
  image?: string;
};

type Brew = {
  step: number;
  waterAmount: number;
  time: number;
  description?: string;
};

type RecipeDetail = {
  groundCoffeeAmount: number;
  ratio: string;
  totalTime: number;
  grindSize: number;
  temperature: number;
  totalYield: number;
  steps: Brew[];
};

export type CreateRecipeInput = {
  images?: string[];
  createBy: string;
  title: string;
  description: string;
  detail: RecipeDetail;
  beanDetail?: BeanDetail;
  brewMethod: string;
};

export type UpdateRecipeInput = {
  images?: string[];
  id: string;
  title?: string;
  description?: string;
  detail?: RecipeDetail;
  productUrl?: string;
  beanDetail?: BeanDetail;
};

export type DeleteRecipeInput = {
  username: string;
  recipeId: string;
};

export type LikeRecipeInput = {
  username: string;
  recipeId: string;
};

export type DisLikeRecipeInput = {
  username: string;
  recipeId: string;
};

export type FollowUserInput = {
  myUsername: string;
  followUser: string;
};

export type CommentInput = {
  comment: string;
  createBy: string;
  commentToNode: string;
};

export type DeleteCommentInput = {
  id: string;
  createBy: string;
  commentToNode: string;
};

export type EditCommentInput = {
  id: string;
  comment: string;
};

export type CreateSavedListInput = {
  createBy: string;
  name: string;
};

export type AddRecipeToListInput = {
  listId: string;
  recipeId: string;
};

export type RemoveRecipeToListInput = {
  listId: string;
  recipeId: string;
};

export type DeleteSavedListInput = {
  listId: string;
  createBy: string;
};
