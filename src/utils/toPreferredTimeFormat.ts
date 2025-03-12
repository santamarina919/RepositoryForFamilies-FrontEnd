import {DateTime} from 'luxon';

export const INVALID_TIME = 'Invalid DateTime'

export default function toPreferredTimeFormat(timeStr :string){
  return DateTime.fromFormat(timeStr,'HH:mm:ss').toLocaleString(DateTime.TIME_SIMPLE)
}
