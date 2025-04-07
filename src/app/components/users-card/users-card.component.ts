import {Component, inject, input} from '@angular/core';

import {GroupsService} from '../../services/groups.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users-card',
  imports: [],
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.css'
})
export class UsersCardComponent  {
  waitingApproval :number | null = null

  groupService = inject(GroupsService)

  route = inject(ActivatedRoute)

  router = inject(Router)

  constructor() {
    const groupId = this.route.snapshot.paramMap.get('groupId') ?? 'NO GROUP ID'
    this.groupService.usersWaitingApproval(groupId)
      .then(promise => {
        promise.subscribe(response => {
          this.waitingApproval = response
        })
      })
  }

  onClick() {

    const groupId = this.route.snapshot.paramMap.get('groupId') ?? 'NO GROUP ID'

    this.router.navigate([`/groups/${groupId}/members`])

  }


}
