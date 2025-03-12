import {Component, computed, inject, input} from '@angular/core';
import {ResourceService} from '../../../services/resource.service';
import {Availability, AvailableBlock} from '../../../types/Availability';
import {DateTime} from 'luxon';
import toPreferredDateFormat from '../../../../utils/toPreferredDateFormat';
import toPreferredTimeFormat, {INVALID_TIME} from '../../../../utils/toPreferredTimeFormat';

@Component({
  selector: 'app-resources-card',
  imports: [],
  templateUrl: './resources-card.component.html',
  styleUrl: './resources-card.component.css'
})
export class ResourcesCardComponent {
  blocks = input.required<Availability | null>()

  hasOpenAvailability(block :AvailableBlock){
    return '-999999999-01-01T00:00:00' == block.start && '+999999999-12-31T23:59:00' == block.end
  }

  availBlockStr(block :AvailableBlock | null){
    if(block == null){
      return 'Unavailable'
    }
    if(this.hasOpenAvailability(block)){
      return 'Available'
    }
    const startTime = DateTime.fromISO(block.start)
    const endTime = DateTime.fromISO(block.end)

    const startDate = toPreferredDateFormat(startTime)
    const endDate = toPreferredDateFormat(endTime)

    if(startDate == endDate){
      return startDate + toPreferredTimeFormat(block.start) + toPreferredTimeFormat(block.end)
    }

    var startTimeStr = toPreferredTimeFormat(block.start)
    if(startTimeStr == INVALID_TIME){
      startTimeStr = ''
    }
    var endTimeStr = toPreferredTimeFormat(block.end)
    if(endTimeStr == INVALID_TIME){
      endTimeStr = ''
    }
    return `Available ${startDate} ${startTimeStr} to ${endDate} ${endTimeStr}`
  }

  determineBlockClass(block :AvailableBlock | null) {
    if(block != null &&  this.availBlockStr(block) == 'Unavailable'){
      return 'unavail'
    }
    return 'avail'
  }

  protected readonly Object = Object;


}
