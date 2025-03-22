import {Component, inject, OnInit, signal} from '@angular/core';
import {ResourceService} from '../services/resource.service';
import {ActivatedRoute} from '@angular/router';
import {ResourceEvent} from '../types/ResourceEvent';
import fetchName from '../../utils/fetchName';
import toPreferredDateFormat, {toPreferredDateFormatStr} from '../../utils/toPreferredDateFormat';
import toPreferredTimeFormat from '../../utils/toPreferredTimeFormat';
import {ReservationComponent} from './reservation/reservation.component';
import {ModalComponent} from '../../utils/modal/modal.component';
import {ResourceComponent} from './resource/resource.component';

@Component({
  selector: 'app-resources',
  imports: [
    ResourceComponent

  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent implements OnInit{

  resourceService = inject(ResourceService)

  route = inject(ActivatedRoute)

  resources :ResourceEvent[] | null= null

  reserveSignal = signal(false)

  ngOnInit() {
    const groupId = this.route.snapshot.paramMap.get('groupId') as string
    this.resourceService.fetchAllResources(groupId)
      .then(promise => {
        promise.subscribe(res => {
          this.resources = res.body
        })
      })
  }

  protected readonly fetchName = fetchName;
  protected readonly toPreferredDateFormat = toPreferredDateFormat;
  protected readonly toPreferredDateFormatStr = toPreferredDateFormatStr;
  protected readonly toPreferredTimeFormat = toPreferredTimeFormat;
  protected readonly ModalComponent = ModalComponent;
}
