import {Component, input, signal} from '@angular/core';
import {ModalComponent} from '../../../utils/modal/modal.component';
import {Resource} from '../../types/Resource';
import fetchName from '../../../utils/fetchName';
import {ReservationComponent} from '../reservation/reservation.component';

@Component({
  selector: 'app-resource',
  imports: [
    ReservationComponent,
    ModalComponent
  ],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.css'
})
export class ResourceComponent {

  resource = input.required<Resource>()

  reserveSignal = signal(false)


  protected readonly ModalComponent = ModalComponent;
  protected readonly fetchName = fetchName;
}
