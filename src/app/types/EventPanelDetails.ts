import {EventDetails} from './EventDetails';
import {ResourceDetails} from './ResourceDetails';

export type EventPanelDetails  = EventDetails & {
  hasWriteAccess : boolean
  reservedResources :ResourceDetails[]
}


