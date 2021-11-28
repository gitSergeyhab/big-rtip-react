import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';

const DATE_FORMAT = 'd/m/y H:i';


const getHoursAndMinutes = (date: string): string => dayjs(date).format('HH:mm');

const addZero = (number: number) => number > 9 ? `${number}` : `0${number}`;

const getMinutes = (from: string, to: string): number => dayjs(to).diff(dayjs(from), 'm');

const getDateFormat = (days: number, hours: number, minutes: number): string => {
  if (days >= 1) {
    return `${addZero(days)}D ${addZero(hours % 24)}H ${addZero(minutes % 60)}M`;
  }
  if (hours >= 1) {
    return `${addZero(hours)}H ${addZero(minutes % 60)}M`;
  }
  return `${addZero(minutes)}M`;
};

const getDiffTime = (dateFrom: string, dateTo: string): string => {
  const date2 = dayjs(dateFrom);
  const date1 = dayjs(dateTo);
  const days = date1.diff(date2, 'd');
  const hours = date1.diff(date2, 'h');
  const minutes = date1.diff(date2, 'm');
  return getDateFormat(days, hours, minutes);
};

const getMonthAndDay = (date: string): string => dayjs(date).format('MMM D');

const getFullDateTime = (date: string): string => dayjs(date).format('DD/MM/YY hh:mm');

type DateLimit =  {maxDate: string | Date} | {minDate: string | Date}


const createFlatPicker = (element: HTMLInputElement, defaultDate: string | Date, onChange: any, dateLimit: DateLimit): Instance => flatpickr(
  element,
  {
    dateFormat: DATE_FORMAT,
    defaultDate: defaultDate,
    enableTime: true,
    'time_24hr': true,
    ...dateLimit,
    onChange,
  },
);


export {
  getHoursAndMinutes,
  getDiffTime,
  getMonthAndDay,
  getFullDateTime,
  getMinutes,
  getDateFormat,
  createFlatPicker
};

