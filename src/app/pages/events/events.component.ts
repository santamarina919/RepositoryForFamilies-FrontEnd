import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {EventsService} from '../../services/events.service';
import {ActivatedRoute} from '@angular/router';
import {EventDetails} from '../../types/EventDetails';
import {EventdateComponent} from '../../components/eventdate/eventdate.component';
import {EventPanelDetails} from '../../types/EventPanelDetails';
import {ModalComponent, ModalState} from '../../components/modal/modal.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateTime} from 'luxon';
import handleNonBlurClick from '../../../utils/handleNonBlurClick';
import {TruthyTypesOf} from 'rxjs';
import {fetchGroupId} from '../../../utils/fetchGroupId';
import {HttpStatusCode} from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import {fetchSelfId} from '../../../utils/fetchSelfId';
@Component({
  selector: 'app-events',
  imports: [
    EventdateComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  eventService = inject(EventsService)

  route = inject(ActivatedRoute)

  events = signal<EventPanelDetails[]>([])

  eventsByDate = computed<Map<string,EventPanelDetails[]>>(() => {
    return this.sortEvents()
  })

  addEventModal = signal<ModalState>('hidden')


  ngOnInit() {
    this.eventService.fetchEvents(this.route.snapshot.paramMap.get('groupId') ?? 'MISSING_GROUP_ID')
      .then(observable => {
        observable.subscribe( {
          next : res => {
            this.events.set(res.body ?? [])
          }
        })
      })
  }

  private sortEvents(){
    const eventMap = new Map<string,EventPanelDetails[]>
    for(const event of this.events()){
      const eventDate = event.date
      if(!eventMap.has(eventDate)){
        eventMap.set(eventDate,[])
      }
      (eventMap.get(eventDate) as EventDetails[]).push(event)
    }

    return eventMap
  }


  addEventForm = new FormGroup({
    eventName : new FormControl<string>(''),
    eventDate : new FormControl<string>(''),
    startTime : new FormControl<string>(''),
    endTime : new FormControl<string>(''),
    description : new FormControl<string>('')
  })

  onSubmit() {
    const groupId = fetchGroupId(this.route)
    this.eventService.createEvent(groupId, this.addEventForm.value)
      .then(promise => {
        promise.subscribe(response => {
          if(response.status == HttpStatusCode.Ok){
              console.warn()
              this.events.set([
              ...this.events(),
              {
                eventId : uuidv4(),
                owner : fetchSelfId() as string,
                description : this.addEventForm.value.description as string,
                date : this.addEventForm.value.eventDate as string,
                startTime : DateTime.fromFormat(this.addEventForm.value.startTime?.concat(':00') as string,'HH:mm:ss').toSQLTime()?.toString().substring(0,8) as string,
                endTime : DateTime.fromFormat(this.addEventForm.value.endTime?.concat(':00') as string,'HH:mm:ss').toSQLTime()?.toString().substring(0,8) as string,
                name : this.addEventForm.value.eventName as string,
                hasWriteAccess : true,
                reservedResources : []
              }
            ])
            this.addEventModal.set('hidden')
          }
        })
      })
  }



  protected readonly handleNonBlurClick = handleNonBlurClick;
  protected readonly ModalComponent = ModalComponent;

}
