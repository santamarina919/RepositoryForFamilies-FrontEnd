import {DateTime} from 'luxon';


export function normalizeInputTime(time :string){
  return DateTime.fromFormat(time.concat(':00') as string,'HH:mm:ss').toSQLTime()?.toString().substring(0,8) as string
}
