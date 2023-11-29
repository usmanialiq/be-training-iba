import * as moment from 'moment';
import 'moment-timezone';

export const utcToGmt5 = (date: number) => {
  const momentUTC = moment(date).utc();
  return momentUTC.clone().tz('Asia/Karachi');
};
