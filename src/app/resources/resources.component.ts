import {Component, inject, OnInit, signal} from '@angular/core';
import {ResourceService} from '../services/resource.service';
import {ActivatedRoute} from '@angular/router';
import {ModalComponent} from '../../utils/modal/modal.component';
import {ResourceComponent} from './resource/resource.component';
import {Resource} from '../types/Resource';

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

  resources :Resource[] | null= null

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

  protected readonly ModalComponent = ModalComponent;
}
