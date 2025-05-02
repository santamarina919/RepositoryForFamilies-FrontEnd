import {ActivatedRoute} from '@angular/router';

const ITEM_NAME_KEY = 'itemName'

export function fetchItemName(route :ActivatedRoute){
  const itemName = route.snapshot.paramMap.get(ITEM_NAME_KEY) as string
  return decodeURIComponent(itemName)
}
