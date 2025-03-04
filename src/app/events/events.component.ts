import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {EventsService} from '../services/events.service';
import {ActivatedRoute} from '@angular/router';
import {EventDetails, EventPanelDetails} from '../types/EventDetails';
import {EventdateComponent} from './eventdate/eventdate.component';

@Component({
  selector: 'app-events',
  imports: [
    EventdateComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit{
  eventService = inject(EventsService)

  route = inject(ActivatedRoute)

  events = signal<EventPanelDetails[]>([])

  eventsByDate = computed<Map<string,EventPanelDetails[]>>(() => {
    return this.sortEvents()
  })

  ngOnInit() {
    this.eventService.fetchEvents(this.route.snapshot.paramMap.get('groupId') ?? 'MISSING_GROUP_ID')
      .then(observable => {
        observable.subscribe( {
          next : res => {
            this.events.set(res.body ?? [])
          }
        })
      })
  }

  private sortEvents(){
    const eventMap = new Map<string,EventPanelDetails[]>
    for(const event of this.events()){
      const eventDate = event.date
      if(!eventMap.has(eventDate)){
        eventMap.set(eventDate,[])
      }
      (eventMap.get(eventDate) as EventDetails[]).push(event)
    }

    return eventMap
  }





}
