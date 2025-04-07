import {UserDetails} from './UserDetails';
import {EventDetails} from './EventDetails';
import {GroupDetails} from './GroupDetails';
import {UserType} from './UserType';

export type GroupGlance = {
  users :UserDetails[]
  groupDetails :GroupDetails
  userType : UserType
}
