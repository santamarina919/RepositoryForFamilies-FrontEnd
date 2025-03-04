import {UserDetails} from './UserDetails';
import {EventDetails} from './EventDetails';
import {GroupDetails} from './GroupDetails';

export type GroupGlance = {
  users :UserDetails[]
  eventGlances :EventDetails[]
  groupDetails :GroupDetails
}
