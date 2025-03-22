import {Resource} from './Resource';
import {UserDetails} from './UserDetails';


export type ResourceEvent = {
  resource :Resource
  reservations :Reservation[]
}

export type Reservation = {
  startTime :string
  endTime :string
  date :string
  notes :string
  reservationOwner :UserDetails
  rejectionNote :string
  reservationId :string
  approved :boolean
  linkedEvent :EventPreview
  writeAccess:boolean
}

export type EventPreview = {
  eventId :string
  name :string
}
