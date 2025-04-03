import {EventDetails} from './EventDetails';

export type Resource = {
  resourceId :string
  owner :string
  name :string
  description :string | null
  type :string

  reservations : EventDetails[]

}
