import { Recipe } from '../recipe.entity';

export const queryToRecipe = (query: Record<string, unknown>) => {
  const formattedRecipe = {
    ...query,
    description: query.description,
    detail: JSON.parse(query.detail as string),
    images: JSON.parse((query?.images as string) || '[]'),
  };

  return formattedRecipe as Recipe;
};
