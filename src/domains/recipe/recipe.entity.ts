export interface Brew {
  pour: number;
  waterAmount: number;
  time: number;
  description?: string;
}

export interface RecipeDetail {
  groundCoffeeAmount: number;
  ratio: string;
  totalTime: number;
  grindSize: number;
  temperature: number;
  totalYield: number;
  steps: Brew[];
}

export interface Recipe {
  id: string;
  images?: string[];
  createBy: string;
  title: string;
  description: string;
  detail: RecipeDetail;
  likes?: number;
  dislikes?: number;
  productUrl?: string;
}
