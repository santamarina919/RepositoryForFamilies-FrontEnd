import {Component, input} from '@angular/core';
import {EventDetails} from '../../../types/EventDetails';
import {DateTime} from 'luxon';
import {RouterLink} from '@angular/router';
import toMonthStr from '../../../../utils/toMonthStr';
import ordinalSuffix from '../../../../utils/ordinalSuffix';
import toPreferredDateFormat from '../../../../utils/toPreferredDateFormat';
import toPreferredTimeFormat from '../../../../utils/toPreferredTimeFormat';
import fetchName from '../../../../utils/fetchName';


@Component({
  selector: 'app-event-card',
  imports: [
    RouterLink
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent  {
  events = input.required<EventDetails[]>()

  eventCardContentStr(eventDetails :EventDetails){
    const date = DateTime.fromISO(eventDetails.date)
    if(date.isValid == false){
      console.warn('In event card details date passed is invalid')
      return ''
    }

    const daysUntilEvent =  Math.trunc(date.diffNow('day').days)
    const inDaysMax = 5
    let contentStr = ''
    if(daysUntilEvent == 0){
      contentStr = 'Today'
    }
    else if(daysUntilEvent == 1) {
      contentStr = 'Tommorow'
    }
    else if(daysUntilEvent <= inDaysMax) {
      contentStr = `In ${inDaysMax} days`
    }
    else {
      contentStr = toPreferredDateFormat(date)
    }

    if(eventDetails.startTime == null){
      return contentStr
    }

    const time = toPreferredTimeFormat(eventDetails.startTime)
    return contentStr.concat(' @',time)
  }






  protected readonly localStorage = localStorage;
  protected readonly fetchName = fetchName;
}
