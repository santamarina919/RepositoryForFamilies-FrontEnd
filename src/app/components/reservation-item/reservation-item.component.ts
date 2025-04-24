import {Component, inject, input, model, signal} from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import {ActivatedRoute} from "@angular/router";
import {ModalComponent, ModalState} from '../modal/modal.component';
import fetchName from '../../../utils/fetchName';
import {toPreferredDateFormatStr} from '../../../utils/toPreferredDateFormat';
import toPreferredTimeFormat from '../../../utils/toPreferredTimeFormat';
import {Resource} from '../../types/Resource';
import {Reservations} from '../../types/Reservations';
import {fetchSelfId} from '../../../utils/fetchSelfId';
import {fetchGroupId} from '../../../utils/fetchGroupId';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-reservation',
  imports: [
    ModalComponent,
    ReactiveFormsModule
  ],
  templateUrl: './reservation-item.component.html',
  styleUrl: './reservation-item.component.css'
})
export class ReservationItemComponent {

  resourceService = inject(ResourceService);

  route = inject(ActivatedRoute)

  reservation = input.required<Reservations>()

  resource = input.required<Resource>()

  resources = model.required<Resource[]>()

  reservations = model.required<Reservations[]>()

  currentResourceId = signal<string | null>(null)

  currentEventId = signal<string | null>(null)

  currentRejectionString = signal<string | null>(null)

  rejectModal = signal<ModalState>('hidden')

  rejectionForm = new FormGroup({
    reason : new FormControl('')
  })

  handleApprove(resourceId :string,eventId :string){
    const groupId = fetchGroupId(this.route)
    this.resourceService.approveReservation(groupId,resourceId,eventId)
    this.reservations.set(this.reservations().map(val => {
      if(val.resourceId == resourceId && val.linkedEvent.eventId == eventId){
        return {
          ...val,
          approved : true,
          rejectionNote : null
        };
      }
      else{
        return val;
      }
    }))
  }

  createTimeDescription(startTime: string | null, endTime: string | null) {
    if(startTime == null || endTime == null){
      return 'All Day'
    }
    return toPreferredTimeFormat(startTime) + ' to ' + toPreferredTimeFormat(endTime)
  }

  handleRejection() {
    const groupId = fetchGroupId(this.route)
    this.resourceService.rejectReservation(groupId,
              this.currentResourceId() ?? 'MISSING RESOURCE ID in handleRejection()',
              this.currentEventId() ?? 'Missing event id in handleRejection()')
      .then(promise => {
        promise.subscribe(res => {
          console.warn(res.status)
        })
      })

    this.reservations.set(this.reservations().map(val => {
      if(val.resourceId == this.currentResourceId() && val.linkedEvent.eventId == this.currentEventId()){
        return {
          ...val,
          approved : false,
          rejectionNote : this.currentRejectionString()
        };
      }
      else{
        return val;
      }
    }))
    this.rejectModal.set('hidden')
  }

  handleRejectClick(resourceId: string, eventId: string) {
    this.currentResourceId.set(resourceId)
    this.currentEventId.set(eventId)
    this.currentRejectionString.set(this.rejectionForm.value.reason ?? null)
    this.rejectModal.set('shown')
  }

  protected readonly fetchName = fetchName;
  protected readonly toPreferredDateFormatStr = toPreferredDateFormatStr;
  protected readonly toPreferredTimeFormat = toPreferredTimeFormat;
  protected readonly fetchSelfId = fetchSelfId;
  protected readonly ModalComponent = ModalComponent;
}
