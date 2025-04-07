import {ActivatedRoute} from '@angular/router';
import {GroupsService} from '../app/services/groups.service';


const GROUP_ID_KEY = 'groupId'

export function fetchGroupId(route :ActivatedRoute){
  const groupId =  route.snapshot.paramMap.get(GROUP_ID_KEY)
  if(groupId == null){
    throw new Error("group id must be present in the current route")
  }
  return groupId
}
