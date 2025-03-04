import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../server.consts';
import {GroupCardDetails} from '../types/GroupCardDetails';
import {group} from '@angular/animations';
import {GroupGlance} from '../types/GroupGlance';

@Injectable({providedIn : 'root'})
export class GroupsService {

  static ALL_GROUPS_ENDPOINT = '/groups/api/listgroups'

  static GLANCE_ENDPOINT = '/groups/api/member/glance?'

  static CREATE_GROUP_ENDPOINT = '/groups/api/creategroup'

  static JOIN_GROUP_ENDPOINT = '/groups/api/joingroup'

  constructor(private http :HttpClient) {

  }

  async fetchGroups()  {
    return this.http.get<GroupCardDetails[]>(
      BASE_URL + GroupsService.ALL_GROUPS_ENDPOINT,
      {
        withCredentials : true,
        observe : 'response'
      }
    )
  }

  async fetchGlance(groupId :string) {
    return this.http.get<GroupGlance>(
      BASE_URL + GroupsService.GLANCE_ENDPOINT,
      {
        withCredentials : true,
        observe : 'response',
        params : new HttpParams().set('groupId',groupId)
      }
    )

  }

  async createGroup(formData:any ){
    return this.http.post<void>(
      BASE_URL + GroupsService.CREATE_GROUP_ENDPOINT,
      formData,
      {
        withCredentials : true,
        observe : 'response',
        headers : {'Content-Type' : 'application/json'}
      }
    )
  }


  async joinGroup(formData :any){
    return this.http.post<void>(
      BASE_URL + GroupsService.JOIN_GROUP_ENDPOINT,
      formData,
      {
        withCredentials : true,
        observe : 'response',
        headers : {'Content-Type' : 'application/json'}
      }
    )
  }
}
