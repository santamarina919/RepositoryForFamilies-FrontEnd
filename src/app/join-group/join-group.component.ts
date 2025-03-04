import {Component, inject} from '@angular/core';
import {GroupsService} from '../services/groups.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GroupsComponent} from '../groups/groups.component';
import {group} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join-group',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './join-group.component.html',
  styleUrl: './join-group.component.css'
})
export class JoinGroupComponent {
  groupService = inject(GroupsService)

  router = inject(Router)

  joinGroupForm = new FormGroup({
    groupId : new FormControl('')
  })


  onSubmit = () => {
    this.groupService.joinGroup(this.joinGroupForm.value)
      .then(observable => {
        observable.subscribe(response => {
          if(response.ok) {
            this.router.navigate([`/groups/${this.joinGroupForm.value.groupId}`])
          }
        })
      })
  }
}
