import { defineStore } from 'pinia';
import dayjs, { OpUnitType, QUnitType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const useDateFormat = defineStore('useDateFormat', () => {
  function dateFormater(format: string, date?: string) {
    const day = date ? dayjs.utc(date) : dayjs.utc();

    return day.tz('Asia/Seoul').format(format);
  }

  function dateDiff(unit: QUnitType | OpUnitType, preDate: string, afterDate?: string) {
    const day = dayjs(preDate);
    const now = afterDate ? dayjs(afterDate) : dayjs();

    return now.diff(day, unit);
  }

  return {
    dateFormater,
    dateDiff,
  };
});
