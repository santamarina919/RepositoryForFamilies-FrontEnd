import {AfterContentInit, AfterViewInit, Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupsService} from '../../services/groups.service';
import {GroupGlance} from '../../types/GroupGlance';
import {HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {ResourceService} from '../../services/resource.service';
import {ResourceGlanceData} from '../../types/ResourceGlanceData';
import {EventsService} from '../../services/events.service';
import {EventDetails} from '../../types/EventDetails';
import {EventCardComponent} from '../../components/event-card/event-card.component';
import {ResourcesCardComponent} from '../../components/resources-card/resources-card.component';
import {UserType} from '../../types/UserType';
import {UsersCardComponent} from '../../components/users-card/users-card.component';

@Component({
  selector: 'app-group-home',
  imports: [
    EventCardComponent,
    ResourcesCardComponent,
    UsersCardComponent
  ],
  templateUrl: './group-glance.component.html',
  styleUrl: './group-glance.component.css'
})
export class GroupGlanceComponent implements OnInit{

  protected route = inject(ActivatedRoute)

  protected groupService = inject(GroupsService)

  protected resourceService = inject(ResourceService)

  protected eventService = inject(EventsService)

  protected glanceData:GroupGlance | null = null;

  protected eventGlances : EventDetails[] | null = null;

  protected resources: ResourceGlanceData[] | null = null

  protected unauthorized = false

  protected userType :UserType = 'Unknown'

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
            const userType = res.body?.userType ?? 'Unknown'
            localStorage.setItem('userType', userType)
            this.userType = userType
          },

          error : (err :HttpErrorResponse) => {
            if(err.status == HttpStatusCode.Unauthorized) {
              this.unauthorized = true
            }
          }


        })
      })


    this.eventService.fetchEventGlance(groupId)
      .then(promise => {
        promise.subscribe((response) => {
          if(response.status == HttpStatusCode.Ok){
            this.eventGlances = response.body
          }
        })
      })

      this.resourceService.glanceResources(groupId)
        .then(promise => {
          promise.subscribe({
            error : (err :HttpErrorResponse) => {
              console.log(err.status)
            },

            next  : (response ) => {
              this.resources = response.body
            }
          })
        })

  }

}
