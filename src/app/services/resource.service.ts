import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../server.consts';
import {ActivatedRoute} from '@angular/router';
import {Resource} from '../types/Resource';
import {AttachResourceForm} from '../types/AttachResourceForm';
import {Availability} from '../types/Availability';


@Injectable({providedIn : 'root'})
export class ResourceService {
  private ALL_RESOURCES_ENDPOINT = '/resources/api/member/all?'

  private CREATE_RESERVATION_ENDPOINT = '/resources/api/member/reserve?'

  private AVAILABILITY_ENDPOINT = '/resources/api/member/availability?'

  private http = inject(HttpClient)

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

  async fetchAvailability(groupId :string,n :number){
    return this.http.get<Availability>(
      BASE_URL + this.AVAILABILITY_ENDPOINT + new HttpParams().set('groupId',groupId).set('n',n),
      {
        withCredentials : true,
        observe : 'response'
      }
    )
  }

}
