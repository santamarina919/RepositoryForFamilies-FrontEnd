import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../../utils/server.consts';
import {Resource} from '../types/Resource';
import {AttachResourceForm} from '../types/AttachResourceForm';
import {ResourceGlanceData} from '../types/ResourceGlanceData';
import {ResourceDetails} from '../types/ResourceDetails';
import {ReservationResponse} from '../types/ReservationResponse';
import {Reservations} from '../types/Reservations';
import {group} from '@angular/animations';

@Injectable({providedIn : 'root'})
export class ResourceService {

  private GLANCE_RESOURCES_ENDPOINT = '/resources/api/member/glance?'

  private ALL_RESOURCES_ENDPOINT = '/resources/api/member/all?'

  private ALL_RESERVATIONS_ENDPOINT = '/reservations/api/member/all'

  private CREATE_RESERVATION_ENDPOINT = '/resources/api/member/reserve?'

  private APPROVE_ENDPOINT = '/resources/api/member/approvereservation?'

  private REJECTION_ENDPOINT  = "/resources/api/member/rejectreservation?";

  private http = inject(HttpClient)

  async glanceResources(groupId :string){
    return this.http.get<ResourceGlanceData[]>(
      BASE_URL + this.GLANCE_RESOURCES_ENDPOINT + new HttpParams().set('groupId',groupId),
      {
        withCredentials : true,
        observe : 'response'
      }
    )
  }

  async fetchResources(groupId :string){
    return this.http.get<Resource[]>(
      BASE_URL + this.ALL_RESOURCES_ENDPOINT + new HttpParams().set('groupId',groupId),
      {
        withCredentials : true,
        observe : 'response'
      }
    )
  }

  async fetchReservations(groupId :string){
    return this.http.get<Reservations[]>(
      BASE_URL + this.ALL_RESERVATIONS_ENDPOINT,
      {
        withCredentials : true,
        observe : 'response',
        params : new HttpParams().set('groupId',groupId)
      }
    )
  }



  async createReservation(groupId :string,linkedEvent :string,resourceId :string){
    return this.http.post<ReservationResponse>(
      BASE_URL + this.CREATE_RESERVATION_ENDPOINT,
      null,
      {
        withCredentials : true,
        observe : 'response',
        params : new HttpParams().set('groupId',groupId).set('linkedEvent',linkedEvent).set('resourceId',resourceId)
      }
    )
  }

  async fetchAllResources(groupId :string){
    return this.http.get<Resource[]>(
      BASE_URL + this.ALL_RESOURCES_ENDPOINT + new HttpParams().set('groupId', groupId),
      {
        withCredentials : true,
        observe : 'response'
      }
    )
  }

  async approveReservation(groupId :string,resourceId:string,eventId :string){
    this.http.post(
      BASE_URL + this.APPROVE_ENDPOINT,
      JSON.stringify({resourceId : resourceId, eventId : eventId}),
      {
        withCredentials : true,
        params : new HttpParams().set('groupId',groupId),
        headers : new HttpHeaders().set('Content-Type','application/json'),
        observe : 'response'
      }
    ).subscribe(res => {
      console.warn(res.status)
    })
  }


  async rejectReservation(groupId :string, resourceId :string, eventId :string){
    return this.http.post(
      BASE_URL + this.REJECTION_ENDPOINT,
      JSON.stringify({resourceId: resourceId, eventId : eventId}),
      {
        withCredentials : true,
        headers : new HttpHeaders().set('Content-Type','application/json'),
        params : new HttpParams().set('groupId',groupId),
        observe : 'response'
      },
    )
  }

}
