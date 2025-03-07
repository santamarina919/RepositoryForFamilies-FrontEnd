import {
  Component,
  computed,
  EventEmitter, HostListener,
  inject,
  input,
  resource,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import {EventDetails, EventPanelDetails} from '../../types/EventDetails';
import {DateTime} from 'luxon';
import {first, single} from 'rxjs';
import toPreferredDateFormat from '../../../utils/toPreferredDateFormat';
import toPreferredTimeFormat from '../../../utils/toPreferredTimeFormat';
import fetchName from '../../../utils/fetchName';
import {NgLocaleLocalization} from '@angular/common';
import {ModalComponent} from '../../../utils/modal/modal.component';
import {FormControl, FormControlName, FormGroup, ReactiveFormsModule} from '@angular/forms';
import handleNonBlurClick from '../../../utils/handleNonBlurClick';
import {ActivatedRoute} from '@angular/router';
import {ResourceService} from '../../services/resource.service';
import {Resource} from '../../types/Resource';
import {group} from '@angular/animations';
import {EventManager} from '@angular/platform-browser';
import {EventsService} from '../../services/events.service';
import {HttpStatusCode} from '@angular/common/http';

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



  attachModalSignal = signal<boolean>(false)

  deleteSignal = signal(false)

  activeSignal :WritableSignal<boolean> | null = null

  @HostListener('document:keyup.esc',[])
  handleEsc(){
    if(this.activeSignal != null) {
      this.invert(this.activeSignal)
      this.activeSignal = null
    }
  }

  contextDate = 'NOT A DATE'

  eventContext = 'NOT AN ID'

  handleAttachClick(date :string, event :string,signal :WritableSignal<boolean>){

    this.contextDate = date
    this.eventContext = event
    this.invert(signal)
    this.activeSignal = signal
  }

  invert(signal :WritableSignal<boolean>){
    this.resourceService.fetchResources(this.router.snapshot.paramMap.get('groupId') ?? 'MISSING GROUP ID')
      .subscribe(res => {
        this.resources = res.body ?? []
      })
    signal.set(!signal())
  }

  attachResourceForm = new FormGroup({
    resourceId : new FormControl(''),
    startTime : new FormControl(''),
    endTime : new FormControl(''),
    notes : new FormControl(''),
  })

  handleSubmit(){
    const groupId = this.router.snapshot.paramMap.get('groupId') ?? 'MISSING GROUP ID'
    const formData = this.attachResourceForm.value
    this.resourceService.createReservation(groupId,this.eventContext,this.contextDate,formData)
      .subscribe(res => {
        console.warn(res)
      })
  }

  eventIdContext = 'Not an id'


  handleDeleteClick(eventId :string){
    this.eventIdContext = eventId
    this.invert(this.deleteSignal)
    this.activeSignal = this.deleteSignal
  }

  approveDelete(){
    const groupId = this.router.snapshot.paramMap.get('groupId') ?? 'MISSING GROUP ID'
    this.eventService.deleteEvent(groupId,this.eventIdContext)
      .then(res => {
        res.subscribe(response => {
          if(response.status == HttpStatusCode.Ok){
            this.invert(this.deleteSignal)
          }
          else{
            //panic
          }
        })
      })
  }

  cancelDelete() {
    this.invert(this.deleteSignal)
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




  protected readonly toPreferredDateFormat = toPreferredDateFormat;
  protected readonly DateTime = DateTime;
  protected readonly EventEmitter = EventEmitter;
  protected readonly fetchName = fetchName;
  protected readonly ModalComponent = ModalComponent;
  protected readonly handleNonBlurClick = handleNonBlurClick;
  protected readonly EventManager = EventManager;
}
