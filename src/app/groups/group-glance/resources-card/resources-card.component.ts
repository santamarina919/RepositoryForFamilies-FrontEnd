import {Component, computed, inject, input} from '@angular/core';
import {ResourceService} from '../../../services/resource.service';
import {ResourceGlanceData} from '../../../types/ResourceGlanceData';
import {DateTime} from 'luxon';
import toPreferredDateFormat from '../../../../utils/toPreferredDateFormat';
import toPreferredTimeFormat, {INVALID_TIME} from '../../../../utils/toPreferredTimeFormat';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-resources-card',
  imports: [
    RouterLink
  ],
  templateUrl: './resources-card.component.html',
  styleUrl: './resources-card.component.css'
})
export class ResourcesCardComponent {
  resources = input.required<ResourceGlanceData[] | null>()

  statusChangeStr(dateTimeStr :string | null)
  {
    if(dateTimeStr == null){
      return 'foreseeable future'
    }
    const time = DateTime.fromISO(dateTimeStr)

    const units = ['minutes','hours']
    for(var unitStr of units){
      const unit = unitStr as 'minutes' | 'hours' | 'days'
      const diff = time.diffNow(unit)
      if(diff[unit] < 10){
        return  Math.trunc(diff[unit]) + ' ' + unit + ' from now'
      }
    }

    return Math.trunc(time.diffNow('days').days) + ' days from now'
  }

  protected readonly Object = Object;


}
