import {ActivatedRoute} from '@angular/router';

const MEAL_ID_KEY = "mealId"

export function fetchMealName(route :ActivatedRoute){
 const mealId =  route.snapshot.paramMap.get(MEAL_ID_KEY) as string;
 return decodeURIComponent(mealId)
}
