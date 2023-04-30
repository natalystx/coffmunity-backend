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
  pour: number;
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
  productUrl?: string;
};

export type UpdateRecipeInput = {
  images?: string[];
  id: string;
  title?: string;
  description?: string;
  detail?: RecipeDetail;
  productUrl?: string;
};

export type DeleteRecipeInput = {
  username: string;
  recipeId: string;
};
