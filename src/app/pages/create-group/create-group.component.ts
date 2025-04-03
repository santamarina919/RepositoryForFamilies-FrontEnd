import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {GroupsService} from '../../services/groups.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-group',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {

  router = inject(Router)

  groupService = inject(GroupsService)

  createGroupForm = new FormGroup({
    groupName : new FormControl('')
  })

  onSubmit = () => {
    this.groupService.createGroup(this.createGroupForm.value)
      .then(observable => {
        observable.subscribe(response => {
          if(response.ok) {
            this.router.navigate(['/groups'])
          }
        })
      })
  }
}
