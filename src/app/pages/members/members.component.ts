import {Component, computed, inject, signal} from '@angular/core';
import {Member} from '../../types/Member';
import {GroupsService} from '../../services/groups.service';
import {ActivatedRoute} from '@angular/router';
import fetchName from '../../../utils/fetchName';
import {fetchGroupId} from '../../../utils/fetchGroupId';
import {isFormRecord} from '@angular/forms';
import {producerMarkClean} from '@angular/core/primitives/signals';
import {group} from '@angular/animations';

@Component({
  selector: 'app-members',
  imports: [],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {
  members = signal<Member[] | null>(null)

  citizenPresent = computed<boolean>(
    () => this.members()?.reduce((foundCitizen,curr) => foundCitizen || curr.memberType == 'CITIZEN',false) ?? false
  )

  hasUnauthorizedPresent = computed<boolean>(
    () => this.members()?.reduce((foundUnauthed,curr) => foundUnauthed || curr.memberType == 'UNAUTHORIZED',false) ?? false
  )

  //all groups have at least 1 admin

  groupService = inject(GroupsService)

  route = inject(ActivatedRoute)

  constructor() {
    const groupId = this.route.snapshot.paramMap.get('groupId') ?? 'NO GROUP ID'
    this.groupService.fetchMembers(groupId)
      .then(promise => {
        promise.subscribe(result => {
          this.members.set(result)
        })
      })
  }


  onRemoveClick(email :string) {
    const groupId= fetchGroupId(this.route)
    this.groupService.removeMember(groupId,email)
      .then(promise => {
        promise.subscribe(response => {
          if(response.status == 200){
            this.members.update(
              (curr) => curr?.filter((val) => val.userId != email) ?? null
            )
          }
        })
      })
  }

  onApproveClick(email :string){
    const groupId = fetchGroupId(this.route)
    this.groupService.approveMember(groupId,email)
      .then(promise => {
        promise.subscribe(response => {
          if(response.status == 200){
            this.members.update(


              arr => arr?.map(

                currMember => {
                  if(currMember.userId == email){
                    return {
                      userId : email,
                      memberType : 'CITIZEN'
                    }
                  }
                  else {
                    return currMember
                  }
                }) ?? null


            )
          }
        })
      })
  }

  onRejectClick(email :string) {
    const groupId  = fetchGroupId(this.route)
    this.groupService.rejectMember(groupId,email)
      .then(promise => {
        promise.subscribe(response => {
          if(response.status == 200) {
            this.members.update(
              (arr) => arr?.filter(curr => curr.userId != email) ?? null
            )
          }
        })
      })
  }

  onAdminClick(email :string){
    const groupId = fetchGroupId(this.route)
    this.groupService.makeMemberAdmin(groupId,email)
      .then(promise =>
        promise.subscribe(response => {
          if(response.status == 200) {
            this.members.update(
              arr =>
                arr?.map(currMem => {
                  if(currMem.userId == email){
                    return  {
                      userId : currMem.userId,
                      memberType : 'ADMIN'
                    }
                  }
                  else {
                    return currMem
                  }
                }) ?? null
            )
          }
        })
      )
  }

  protected readonly fetchName = fetchName;
  protected readonly group = group;
}
