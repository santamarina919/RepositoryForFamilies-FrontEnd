import {EventDetails} from './EventDetails';


export type Reservations = {
  resourceId :string
  approved :boolean | null
  rejectionNote :string | null
  linkedEvent :EventDetails
}
