import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../server.consts';
import {ActivatedRoute, Router} from '@angular/router';
import {routes} from '../root/app.routes';
import {EventDetails, EventPanelDetails} from '../types/EventDetails';


@Injectable({
  providedIn : 'root'
})
export class EventsService {

  static EVENTS_ENDPOINT = '/events/api/member/allevents?'

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

}
