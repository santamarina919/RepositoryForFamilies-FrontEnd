import {
  Component,
  computed,
  EventEmitter, HostListener,
  inject,
  input, model,
  resource,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import {DateTime} from 'luxon';
import {first, single} from 'rxjs';
import toPreferredDateFormat from '../../../utils/toPreferredDateFormat';
import toPreferredTimeFormat from '../../../utils/toPreferredTimeFormat';
import fetchName from '../../../utils/fetchName';
import {NgLocaleLocalization} from '@angular/common';
import {ModalComponent, ModalState} from '../modal/modal.component';
import {FormControl, FormControlName, FormGroup, ReactiveFormsModule} from '@angular/forms';
import handleNonBlurClick from '../../../utils/handleNonBlurClick';
import {ActivatedRoute} from '@angular/router';
import {ResourceService} from '../../services/resource.service';
import {Resource} from '../../types/Resource';
import {group} from '@angular/animations';
import {EventManager} from '@angular/platform-browser';
import {EventsService} from '../../services/events.service';
import {HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import {EventPanelDetails} from '../../types/EventPanelDetails';

//TODO implement edit function
@Component({
  selector: 'app-eventdate',
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './eventdate.component.html',
  styleUrl: './eventdate.component.css'
})
export class EventdateComponent {

  router = inject(ActivatedRoute)

  resourceService = inject(ResourceService)

  eventService = inject(EventsService)

  unsortedEvents = model.required<EventPanelDetails[]>()

  eventDate = input.required<string>()

  events = input.required<EventPanelDetails[]>()

  eventsSortedByTime = computed<EventPanelDetails[]>(() => {
    return this.events().sort((a,b) => {
      if(a.startTime == null){
        return 1
      }
      if(b.startTime == null){
        return -1
      }

      const firstTime = DateTime.fromFormat(a.startTime,"HH:mm:ss")
      const secondTime = DateTime.fromFormat(b.startTime,"HH:mm:ss")

      return firstTime.diff(secondTime,'seconds').seconds
    })
  })


  resources:Resource[] | null = null



  attachModalSignal = signal<ModalState>('hidden')

  deleteSignal = signal<ModalState>('hidden')


  eventContext = 'When the attach button is clicked this variable will be set to the corresponding events id'

  handleAttachClick(date :string, event :string,signal :WritableSignal<ModalState>){
    this.eventContext = event
    this.resourceService.fetchResources(this.router.snapshot.paramMap.get('groupId') ?? 'MISSING GROUP ID')
      .subscribe(res => {
        this.resources = res.body ?? []
      })
    this.attachModalSignal.set('shown')
  }

  attachResourceForm = new FormGroup({
    resourceId : new FormControl(''),
  })

  handleAttachResourceSubmit(){
    const groupId = this.router.snapshot.paramMap.get('groupId') ?? 'MISSING GROUP ID'
    this.resourceService.createReservation(groupId,this.eventContext,this.attachResourceForm.value.resourceId ?? 'Form Value Retrieval Failed in submit')
      .then(promise => {
        promise.subscribe({
          error : (response :HttpErrorResponse) => {

          },

          next : (response) => {
            if(response.status == HttpStatusCode.Ok){
              this.unsortedEvents.set(
                this.unsortedEvents().map(event => {
                  if(event.eventId != this.eventContext) {return event}


                  if(response.body == null){
                    throw Error ('could not retrieve reserved resource details')
                  }
                  return {
                    ...event,
                    reservedResources : [
                      response.body.resourceDetails,
                      ...event.reservedResources
                    ]
                  }

                })
              )


              this.attachModalSignal.set('hidden')
            }
          }
        })
      })
  }

  eventIdContext = 'Not an id'


  handleDeleteClick(eventId :string){
    this.eventIdContext = eventId
    this.deleteSignal.set('shown')
  }

  approveDelete(){
    const groupId = this.router.snapshot.paramMap.get('groupId') ?? 'MISSING GROUP ID'
    this.eventService.deleteEvent(groupId,this.eventIdContext)
      .then(res => {
        res.subscribe(response => {
          if(response.status == HttpStatusCode.Ok){
            this.deleteSignal.set('hidden')
          }
          else{
            //panic
          }
        })
      })
  }

  cancelDelete() {
    this.deleteSignal.set('hidden')
  }


  durationStr(startTime:string | null, endTime :string | null){

    if(startTime != null && endTime != null){
      return `${this.getStartTimeStr(startTime)} to ${this.getEndTimeStr(endTime)}`
    }
    else if (startTime != null) {
      return `${this.getStartTimeStr(startTime)}`
    }
    else {
      return `${this.getEndTimeStr(endTime)}`
    }
  }

  getStartTimeStr(startTimeStr :string | null) {
    if(startTimeStr == null) return ""

    return `${toPreferredTimeFormat(startTimeStr)}`

  }

  getEndTimeStr(endTimeStr :string | null){
    if(endTimeStr == null) return ""

    return `${toPreferredTimeFormat(endTimeStr)}`
  }

  reservationStatusStr(approved: null | boolean) {
    if(approved == null){
      return 'Owner has not explicitly approved or rejected this reservation'
    }
    if(approved){
      return 'Owner has approved this reservation'
    }
    else{
      return 'Owner has denied this reservation'
    }
  }


  protected readonly toPreferredDateFormat = toPreferredDateFormat;
  protected readonly DateTime = DateTime;
  protected readonly EventEmitter = EventEmitter;
  protected readonly fetchName = fetchName;
  protected readonly ModalComponent = ModalComponent;
  protected readonly handleNonBlurClick = handleNonBlurClick;
  protected readonly EventManager = EventManager;


}
