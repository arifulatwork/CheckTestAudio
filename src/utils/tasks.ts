import { addDays, format, differenceInDays, startOfDay } from 'date-fns';

import i18n from '@/translations/i18n';
import { Task } from '@/types/Task';

const dateIsWithinWeekFuture = (date: Date) => {
  if (date.getTime() < startOfDay(new Date()).getTime()) return false;
  return differenceInDays(date, startOfDay(new Date())) < 7;
};

export function formatDeadline(str: string) {
  const weekdays = [
    i18n.t('weekdaysLong.Sun'),
    i18n.t('weekdaysLong.Mon'),
    i18n.t('weekdaysLong.Tue'),
    i18n.t('weekdaysLong.Wed'),
    i18n.t('weekdaysLong.Thu'),
    i18n.t('weekdaysLong.Fri'),
    i18n.t('weekdaysLong.Sat'),
  ];
  const formatd = (d: Date) => format(d, 'dd.MM.yyyy');
  const date = new Date(str);
  if (formatd(date) === formatd(new Date())) return i18n.t('general.today');
  if (formatd(date) === formatd(addDays(new Date(), 1))) return i18n.t('general.tomorrow');
  if (formatd(date) === formatd(addDays(new Date(), -1))) return i18n.t('general.yesterday');

  const weekday = weekdays[date.getDay()];
  if (dateIsWithinWeekFuture(date)) return weekday;

  return weekday + ', ' + formatd(date);
}

export function getUnApprovedTaskCount(tasks: Task[]) {
  return tasks.reduce((number, task) => {
    const unapproved = task.sessions.filter((t) => t.completedAt && !t.approvedAt).length;
    return number + unapproved;
  }, 0);
}

export function formatUnix(unix: number) {
  const date = format(new Date(unix), 'yyyy-MM-dd');
  return formatDeadline(date);
}
