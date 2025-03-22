import {DateTime} from 'luxon';
import toMonthStr from './toMonthStr';
import ordinalSuffix from './ordinalSuffix';
import toPreferredTimeFormat from './toPreferredTimeFormat';

export default function toPreferredDateFormat(date :DateTime){
    return `${toMonthStr(date.month)} ${date.day}${ordinalSuffix(date.day)}, ${date.year}`
}


export function toPreferredDateFormatStr(date :string){
  return toPreferredDateFormat(DateTime.fromISO(date))
}
