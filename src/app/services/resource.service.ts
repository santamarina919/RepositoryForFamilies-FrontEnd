import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../../utils/server.consts';
import {Resource} from '../types/Resource';
import {AttachResourceForm} from '../types/AttachResourceForm';
import {ResourceGlanceData} from '../types/ResourceGlanceData';

@Injectable({providedIn : 'root'})
export class ResourceService {

  private GLANCE_RESOURCES_ENDPOINT = '/resources/api/member/glance?'

  private ALL_RESOURCES_ENDPOINT = '/resources/api/member/all?'

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

  fetchResources(groupId :string){
    return this.http.get<Resource[]>(
      BASE_URL + this.ALL_RESOURCES_ENDPOINT + new HttpParams().set('groupId',groupId),
      {
        withCredentials : true,
        observe : 'response'
      }
    )
  }

  createReservation(groupId :string,eventId :string | null,date :string,form :AttachResourceForm){
    const formz = {...form,date : date, linkedEvent : eventId}

    return this.http.post(
      BASE_URL + this.CREATE_RESERVATION_ENDPOINT + new HttpParams().set('groupId',groupId),
      JSON.stringify(formz),
      {
        headers : new HttpHeaders().set('Content-Type','application/json'),
        withCredentials : true,
        observe : 'response'
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

  async approveReservation(groupId :string,reservationId:string,resourceId :string){
    this.http.post(
      BASE_URL + this.APPROVE_ENDPOINT,
      JSON.stringify({reservationId : reservationId, resourceId : resourceId}),
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


  async rejectReservation(groupId :string, reservationId :string,resourceId :string){
    this.http.post(
      BASE_URL + this.REJECTION_ENDPOINT,
      JSON.stringify({reservationId,resourceId}),
      {
        withCredentials : true,
        headers : new HttpHeaders().set('Content-Type','application/json'),
        params : new HttpParams().set('groupId',groupId)
      }
    )
  }

}
