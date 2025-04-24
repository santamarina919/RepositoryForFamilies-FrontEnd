import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import {ActivatedRoute} from '@angular/router';
import {ModalComponent} from '../../components/modal/modal.component';
import {ResourceItemComponent} from '../../components/resource-item/resource-item.component';
import {Resource} from '../../types/Resource';
import {Reservations} from '../../types/Reservations';

@Component({
  selector: 'app-resources',
  imports: [
    ResourceItemComponent

  ],
  templateUrl: './all-resources-page.component.html',
  styleUrl: './all-resources-page.component.css'
})
export class AllResourcesPageComponent implements OnInit{

  resourceService = inject(ResourceService)

  route = inject(ActivatedRoute)

  resources = signal<Resource[]>([])

  reservations  = signal<Reservations[]>([])

  reservationMap = computed<Map<string,Reservations[]>>(() => {
    const map = new Map<string,Reservations[]>()
    this.reservations().forEach(val => {
      map.set(val.resourceId,[])
      map.get(val.resourceId)?.push(val)
    })
    return map
  })


  ngOnInit() {
    const groupId = this.route.snapshot.paramMap.get('groupId') as string
    this.resourceService.fetchAllResources(groupId)
      .then(promise => {
        promise.subscribe(res => {
          this.resources.set(res.body ?? [])
        })
      })

    this.resourceService.fetchReservations(groupId)
      .then(promise => {
        promise.subscribe(res => {
          this.reservations.set(res.body ?? [])
        })
      })
  }

  protected readonly ModalComponent = ModalComponent;
}
