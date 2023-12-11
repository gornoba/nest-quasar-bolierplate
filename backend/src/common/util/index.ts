import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function timeFormat(format: string, time?: string) {
  const beforeReturn = time ? dayjs(time) : dayjs();
  return beforeReturn.utc().tz('Asia/Seoul').format(format);
}
