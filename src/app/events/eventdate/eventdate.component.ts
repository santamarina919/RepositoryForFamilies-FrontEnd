import {Component, computed, EventEmitter, inject, input, signal, viewChild, WritableSignal} from '@angular/core';
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

@Component({
  selector: 'app-eventdate',
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: './eventdate.component.html',
  styleUrl: './eventdate.component.css'
})
export class EventdateComponent {

  router = inject(ActivatedRoute)

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

  resourceService = inject(ResourceService)

  resources:Resource[] | null = null

  attachModal = signal<boolean>(false)

  invert(signal :WritableSignal<boolean>){
    this.resourceService.fetchResources(this.router.snapshot.paramMap.get('groupId') ?? 'MISSING GROUP ID')
      .subscribe(res => {
        this.resources = res.body ?? []
      })
    signal.set(!signal())
  }

  attachResourceForm = new FormGroup({
    resourceName : new FormControl(''),
    reservationStart : new FormControl(''),
    reservationEnd : new FormControl(''),
    reservationNotes : new FormControl('')
  })





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
}
