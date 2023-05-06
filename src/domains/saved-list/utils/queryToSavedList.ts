import { SavedList } from '../save-list.entity';

export const queryToSavedList = (query: Record<string, any>) => {
  return {
    ...query,
    saveRecipeIds:
      query['saveRecipeIds'] === '' ? [] : (query['saveRecipeIds'] as string[]),
  } as SavedList;
};
