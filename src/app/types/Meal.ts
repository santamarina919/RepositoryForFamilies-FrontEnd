import {Ingredient} from './Ingredient';
import {Direction} from './Direction';

export type Meal = {
  mealName :string
  ingredients :Ingredient[]
  directions :Direction[]
}
