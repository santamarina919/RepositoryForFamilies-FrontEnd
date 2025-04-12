import {ResourceDetails} from './ResourceDetails';


export type ReservationResponse = {
  resourceDetails : ResourceDetails,
  collisions : any[]//TODO assign actual type to this
}
