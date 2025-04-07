import {Component, inject, input, Input, signal} from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import {ActivatedRoute} from "@angular/router";
import {ModalComponent} from '../modal/modal.component';
import fetchName from '../../../utils/fetchName';
import {toPreferredDateFormatStr} from '../../../utils/toPreferredDateFormat';
import toPreferredTimeFormat from '../../../utils/toPreferredTimeFormat';
import {Resource} from '../../types/Resource';
import {EventDetails} from '../../types/EventDetails';

@Component({
  selector: 'app-reservation',
  imports: [
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  reservation = input.required<EventDetails>()
  resourceService = inject(ResourceService);
  route = inject(ActivatedRoute)

  rejectModal = signal(false)


  onModalClick(event :Event){
    event.stopPropagation()
  }


  handleReject(reservationId :string, resourceId :string) {
    this.rejectModal.set(!this.rejectModal())
    //this.resourceService.rejectReservation(this.route.snapshot.paramMap.get('groupId')! ,reservationId,resourceId)
  }


  createTimeDescription(startTime: string | null, endTime: string | null) {
    if(startTime == null || endTime == null){
      return 'All Day'
    }
    return toPreferredTimeFormat(startTime) + ' to ' + toPreferredTimeFormat(endTime)
  }

  protected readonly fetchName = fetchName;
  protected readonly toPreferredDateFormatStr = toPreferredDateFormatStr;
  protected readonly toPreferredTimeFormat = toPreferredTimeFormat;


}
