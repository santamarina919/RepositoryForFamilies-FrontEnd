import {AfterContentInit, AfterViewInit, Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {group} from '@angular/animations';
import {GroupsService} from '../../services/groups.service';
import {GroupGlance} from '../../types/GroupGlance';
import {EventCardComponent} from './event-card/event-card.component';
import {HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {catchError} from 'rxjs';
import {ResourcesCardComponent} from './resources-card/resources-card.component';
import {ResourceService} from '../../services/resource.service';
import {Availability} from '../../types/Availability';

@Component({
  selector: 'app-group-home',
  imports: [
    EventCardComponent,
    ResourcesCardComponent
  ],
  templateUrl: './group-glance.component.html',
  styleUrl: './group-glance.component.css'
})
export class GroupGlanceComponent implements OnInit{

  protected route = inject(ActivatedRoute)

  protected groupService = inject(GroupsService)

  protected resourceService = inject(ResourceService)

  protected glanceData:GroupGlance | null = null;

  protected resourceBlocks: Availability | null = null

  protected unauthorized = false

  ngOnInit() {
    const groupId= this.route.snapshot.paramMap.get('groupId') ?? 'MISSING_GROUP_ID'
    this.groupService.fetchGlance(groupId)
      .then(observable => {
        observable.subscribe({

          next : (res) => {

            this.glanceData = res.body as GroupGlance

            //save user data to get later on in app
            for (const user of this.glanceData?.users) {
              //TODO simplify this in backend
              localStorage.setItem(user.email + 'name', user.firstName + ' ' + user.lastName)
            }
          },

          error : (err :HttpErrorResponse) => {
            if(err.status == HttpStatusCode.Unauthorized) {
              this.unauthorized = true
            }
          }


        })
      })

    this.resourceService.fetchAvailability(groupId,3)
      .then(promise => {
        promise.subscribe({
          next : value => {
            this.resourceBlocks = value.body
          }
        })
      })

  }

}
