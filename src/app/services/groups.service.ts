import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BASE_URL} from '../../utils/server.consts';
import {GroupCardDetails} from '../types/GroupCardDetails';
import {group} from '@angular/animations';
import {GroupGlance} from '../types/GroupGlance';
import {MembersComponent} from '../pages/members/members.component';
import {Member} from '../types/Member';

@Injectable({providedIn : 'root'})
export class GroupsService {

  static ALL_GROUPS_ENDPOINT = '/groups/api/listgroups'

  static GLANCE_ENDPOINT = '/groups/api/member/glance?'

  static CREATE_GROUP_ENDPOINT = '/groups/api/creategroup'

  static JOIN_GROUP_ENDPOINT = '/groups/api/joingroup'

  static UNAPPROVED_USERS_ENDPOINT = '/groups/api/admin/unapproved?'

  static ALL_MEMBERS_ENDPOINT = '/groups/api/admin/members?'

  static REMOVE_GROUP_MEMBER = '/groups/api/admin/removemember?'

  static APPROVE_MEMBER = '/groups/api/admin/approvemember?'

  static REJECT_MEMBER = '/groups/api/admin/rejectmember'

  static ADMIN_MEMBER = '/groups/api/admin/adminmember?'



  constructor(private http :HttpClient) {

  }

  async fetchGroupDetails()  {
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


  async usersWaitingApproval(groupId :string){
    return this.http.get<number>(
      BASE_URL + GroupsService.UNAPPROVED_USERS_ENDPOINT ,
      {
        withCredentials : true,
        params : new HttpParams().set('groupId', groupId)
      }
    )
  }

  async fetchMembers(groupId :string){
    return this.http.get<Member[]>(
      BASE_URL + GroupsService.ALL_MEMBERS_ENDPOINT,
      {
        withCredentials : true,
        params : new HttpParams().set('groupId',groupId)
      }
    )
  }

  async approveMember(groupId :string, email :string){
    return this.http.post(
      BASE_URL + GroupsService.APPROVE_MEMBER,
      null,
      {
        withCredentials : true,
        params : new HttpParams().set('groupId',groupId).set('email',email),
        observe : 'response'
      }
    )
  }

  async rejectMember(groupId :string, email :string) {
    return this.http.post(
      BASE_URL + GroupsService.REJECT_MEMBER,
      null,
      {
        withCredentials : true,
        params : new HttpParams().set('groupId',groupId).set('email',email),
        observe : 'response'
      }
    )
  }

  async makeMemberAdmin(groupId :string, email :string){
    return this.http.post(
      BASE_URL + GroupsService.ADMIN_MEMBER,
      null,
      {
        withCredentials : true,
        params : new HttpParams().set('groupId',groupId).set('email',email),
        observe : 'response'
      }
    )
  }

  async removeMember(groupId :string, email :string){
    return this.http.post(
      BASE_URL + GroupsService.REMOVE_GROUP_MEMBER,
      null,
      {
        withCredentials : true,
        params : new HttpParams().set("groupId",groupId).set('email',email),
        observe : 'response'
      }

    )
  }


}
