import {Component, computed, EventEmitter, input, signal} from '@angular/core';
import {EventDetails, EventPanelDetails} from '../../types/EventDetails';
import {DateTime} from 'luxon';
import {first} from 'rxjs';
import toPreferredDateFormat from '../../../utils/toPreferredDateFormat';
import toPreferredTimeFormat from '../../../utils/toPreferredTimeFormat';
import fetchName from '../../../utils/fetchName';
import {NgLocaleLocalization} from '@angular/common';

@Component({
  selector: 'app-eventdate',
  imports: [],
  templateUrl: './eventdate.component.html',
  styleUrl: './eventdate.component.css'
})
export class EventdateComponent {
  eventDate = input.required<string>()

  events = input.required<EventPanelDetails[]>()

  eventsSortedByTime = computed<EventPanelDetails[]>(() => {
    return this.events().sort((a,b) => {
      if(a.startTime == null){
        return 1
      }
      if(b.startTime == null){
        return -1
      }

      const firstTime = DateTime.fromFormat(a.startTime,"HH:mm:ss")
      const secondTime = DateTime.fromFormat(b.startTime,"HH:mm:ss")

      return firstTime.diff(secondTime,'seconds').seconds
    })
  })

  showPanel = signal<string>("hiddenPanel")

  onClickPanel = () => {
    const panelStr = this.showPanel() == "hiddenPanel" ? "showPanel" : "hiddenPanel"
    this.showPanel.set(panelStr)
}

  durationStr(startTime:string | null, endTime :string | null){
    if(startTime != null && endTime != null){
      return `${this.getStartTimeStr(startTime)} to ${this.getEndTimeStr(endTime)}`
    }
    else if (startTime != null) {
      return `${this.getStartTimeStr(startTime)}`
    }
    else {
      return `${this.getEndTimeStr(endTime)}`
    }
  }

  getStartTimeStr(startTimeStr :string | null) {
    if(startTimeStr == null) return ""

    return `${toPreferredTimeFormat(startTimeStr)}`

  }

  getEndTimeStr(endTimeStr :string | null){
    if(endTimeStr == null) return ""

    return `${toPreferredTimeFormat(endTimeStr)}`
  }


  protected readonly toPreferredDateFormat = toPreferredDateFormat;
  protected readonly DateTime = DateTime;
  protected readonly EventEmitter = EventEmitter;
  protected readonly fetchName = fetchName;
}
