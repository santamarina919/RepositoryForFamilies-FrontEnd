import {Component, inject, input, model, signal} from '@angular/core';
import {ModalComponent, ModalState} from '../modal/modal.component';
import {Resource} from '../../types/Resource';
import fetchName from '../../../utils/fetchName';
import {ReservationItemComponent} from '../reservation-item/reservation-item.component';
import {Reservations} from '../../types/Reservations';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {invalidKey} from '../../../utils/invalidKey';
import {EventsService} from '../../services/events.service';
import {ResourceService} from '../../services/resource.service';
import {fetchGroupId} from '../../../utils/fetchGroupId';
import {ActivatedRoute} from '@angular/router';
import {HttpResponse, HttpStatusCode} from '@angular/common/http';
import {sortReservationsFunc} from '../../../utils/sortReservationsFunc';
import {EventDetails} from '../../types/EventDetails';
import {fetchSelfId} from '../../../utils/fetchSelfId';

@Component({
  selector: 'app-resource',
  imports: [
    ReservationItemComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './resource-item.component.html',
  styleUrl: './resource-item.component.css'
})
export class ResourceItemComponent {

  eventService = inject(EventsService)

  resourceService = inject(ResourceService)

  route = inject(ActivatedRoute)

  resource = input.required<Resource>()

  reservationMap = input.required<Map<String,Reservations[]>>()

  resources = model.required<Resource[]>()

  reservations = model.required<Reservations[]>()

  reserveSignal = signal<ModalState>('hidden')

  events = signal<EventDetails[] | null>(null)

  EVENT_ID_INVALID_KEY = invalidKey('Coming from resource component reserve form')

  reserveForm = new FormGroup({
    eventId : new FormControl(this.EVENT_ID_INVALID_KEY),
    eventName : new FormControl(''),
    eventDate : new FormControl(''),
    startTime : new FormControl(''),
    endTime : new FormControl(''),
    description : new FormControl('')
  })

  handleNewReservationSubmit() {

    const groupId = fetchGroupId(this.route)

    if(this.reserveForm.value.eventId != this.EVENT_ID_INVALID_KEY){
      this.resourceService.createReservation(groupId,this.reserveForm.value.eventId ?? `${this.EVENT_ID_INVALID_KEY}`,this.resource().resourceId)
        .then(promise => {
          promise.subscribe(response => {
            if(response.status != 200) return;

              this.updateReservationState({
                resourceId : this.resource().resourceId,
                approved : this.resource().owner == fetchSelfId(),
                rejectionNote : null,
                linkedEvent : this.events()?.find(
                  (event) => event.eventId == this.reserveForm.value.eventId
                ) as EventDetails
              })
          })

        })
    }
    this.reserveSignal.set('hidden')
  }

  private updateReservationState(newReservation :Reservations){
    this.reservations.set(
      [
        ...this.reservations(),
        newReservation
      ]
        .sort(sortReservationsFunc)
    )
  }

  handleNewReservationClick() {
    const groupId = fetchGroupId(this.route)
    if(this.events() == null){
      this.eventService.fetchCurrUserEvents(groupId)
        .then(promise => {
          promise.subscribe(response => {
            if(response.status != HttpStatusCode.Ok) return

            //only concerned with EventDetails data
            const eventData = response.body as EventDetails[]
            this.events.set(eventData)
          })
        })
    }
    this.reserveSignal.set('shown')
  }

  protected readonly ModalComponent = ModalComponent;
  protected readonly fetchName = fetchName;


  protected readonly event = event;
  protected readonly invalidKey = invalidKey;
}
