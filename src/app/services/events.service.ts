import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../server.consts';
import {ActivatedRoute, Router} from '@angular/router';
import {routes} from '../root/app.routes';
import {EventDetails, EventPanelDetails} from '../types/EventDetails';


@Injectable({
  providedIn : 'root'
})
export class EventsService {

  static EVENTS_ENDPOINT = '/events/api/member/allevents?'

  static DELETE_EVENT_ENDPOINT = '/events/api/member/deleteevent?'

  http = inject(HttpClient)



  async fetchEvents(groupId :string) {
    return this.http.get<EventPanelDetails[]>(
      BASE_URL + EventsService.EVENTS_ENDPOINT,
      {
        params : new HttpParams().set('groupId',groupId),
        withCredentials : true,
        observe : 'response'

      }
    )
  }

  async deleteEvent(groupId :string, eventId :string){
    return this.http.post(
      BASE_URL + EventsService.DELETE_EVENT_ENDPOINT + new HttpParams().set('groupId',groupId),
      JSON.stringify({eventId : eventId}),
      {
        headers : new HttpHeaders().set('Content-Type','application/json'),
        withCredentials : true,
        observe : 'response'
      }
      )
  }

}
