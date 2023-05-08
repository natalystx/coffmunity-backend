export interface Brew {
  step: number;
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
  tds?: number;
}

export interface BeanDetail {
  process: string;
  roastLevel: string;
  tasteNotes: string[];
  origin?: string;
  varieties?: string[];
  productUrl?: string;
}

export interface Recipe {
  id: string;
  images?: string[];
  brewMethod: string;
  createBy: string;
  title: string;
  description: string;
  detail: RecipeDetail;
  likes?: number;
  dislikes?: number;
  beanDetail?: BeanDetail;
  createdTime: number;
}
