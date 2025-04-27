import {Component, inject, OnInit, signal} from '@angular/core';
import {KitchenService} from '../../services/kitchen.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {fetchGroupId} from '../../../utils/fetchGroupId';
import {HttpStatusCode} from '@angular/common/http';

@Component({
  selector: 'app-kitchen-card',
  imports: [
    RouterLink
  ],
  templateUrl: './kitchen-card.component.html',
  styleUrl: './kitchen-card.component.css'
})
export class KitchenCardComponent implements OnInit{
  //consider changing to regular variable
  mealCount = signal<number | null>(null)

  route = inject(ActivatedRoute)

  router = inject(Router)

  kitchenService = inject(KitchenService)

  ngOnInit(): void {
    const groupId = fetchGroupId(this.route)

    this.kitchenService.MealCount(groupId)
      .then(promise => {
        promise.subscribe(response => {
          if(response.status == HttpStatusCode.Ok){
            this.mealCount.set(response.body)
          }
        })
      })
  }




}
