import {DateTime} from 'luxon';
import toMonthStr from './toMonthStr';
import ordinalSuffix from './ordinalSuffix';

export default function toPreferredDateFormat(date :DateTime){
    return `${toMonthStr(date.month)} ${date.day}${ordinalSuffix(date.day)}, ${date.year}`
}
