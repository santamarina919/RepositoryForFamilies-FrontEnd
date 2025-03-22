import {Component, inject, input, Input, signal} from '@angular/core';
import {ResourceService} from "../../services/resource.service";
import {ActivatedRoute} from "@angular/router";
import {ModalComponent} from '../../../utils/modal/modal.component';
import {Reservation} from '../../types/ResourceEvent';
import fetchName from '../../../utils/fetchName';
import {toPreferredDateFormatStr} from '../../../utils/toPreferredDateFormat';
import toPreferredTimeFormat from '../../../utils/toPreferredTimeFormat';
import {Resource} from '../../types/Resource';

@Component({
  selector: 'app-reservation',
  imports: [
    ModalComponent
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {

  reservation = input.required<Reservation>();
  resource = input.required<Resource>()
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


  protected readonly fetchName = fetchName;
  protected readonly toPreferredDateFormatStr = toPreferredDateFormatStr;
  protected readonly toPreferredTimeFormat = toPreferredTimeFormat;
}
