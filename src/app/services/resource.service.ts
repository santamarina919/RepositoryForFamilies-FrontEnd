import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../server.consts';
import {ActivatedRoute} from '@angular/router';
import {Resource} from '../types/Resource';


@Injectable({providedIn : 'root'})
export class ResourceService {
  private ALL_RESOURCES_ENDPOINT = '/resources/api/member/all?'

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
}
