import { endOfMonth, getDaysInMonth } from 'date-fns';
import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import Day from './Day';

type MonthProps = {
  month: number;
  year: number;
  weekStart: 'monday' | 'sunday';
  selectedDate?: Date;
  onSelect: (val: Date) => void;
  dateDisabled?: (date: Date) => boolean;
};

const createFillers = (num: number, keyPrefix: string) =>
  new Array(num).fill(0).map((_, ix) => <Day key={keyPrefix + ix} />);

function createChunks<T>(array: T[], chunkSize: number) {
  return array.reduce((array, element, index) => {
    const newArray = [...array];
    if (index % chunkSize === 0) {
      newArray.push([element]);
    } else {
      newArray[newArray.length - 1].push(element);
    }

    return newArray;
  }, [] as T[][]);
}

const getCurrentDayIfInMonth = (year: number, month: number) =>
  new Date().getFullYear() === year && new Date().getMonth() + 1 === month
    ? new Date().getDate()
    : undefined;

const getFillersNeeded = (
  weekStart: MonthProps['weekStart'],
  startDayOfTheWeek: number,
  endDayOfTheWeek: number
) => {
  let fillersNeededStart = weekStart === 'sunday' ? startDayOfTheWeek : startDayOfTheWeek - 1;
  if (fillersNeededStart === -1) fillersNeededStart = 6;

  let fillersNeededEnd = weekStart === 'sunday' ? 6 - endDayOfTheWeek : 7 - endDayOfTheWeek;
  fillersNeededEnd = weekStart === 'monday' && endDayOfTheWeek === 0 ? 0 : fillersNeededEnd;

  return [fillersNeededStart, fillersNeededEnd];
};

const Month = ({
  month,
  year,
  weekStart = 'monday',
  selectedDate,
  onSelect,
  dateDisabled,
}: MonthProps) => {
  const startingDate = new Date(year, month - 1);
  const startDayOfTheWeek = startingDate.getDay(); // 0= sunday, 1=monday and so on

  const endDate = endOfMonth(startingDate);
  const endDayOfTheWeek = endDate.getDay();
  const daysInMonth = getDaysInMonth(startingDate);

  const currentDate = getCurrentDayIfInMonth(year, month);

  const [fillersNeededStart, fillersNeededEnd] = getFillersNeeded(
    weekStart,
    startDayOfTheWeek,
    endDayOfTheWeek
  );
  const fillersStart = createFillers(fillersNeededStart, 'fillerStart');
  const fillersEnd = createFillers(fillersNeededEnd, 'fillerEnd');

  const selectedDayInThisMonth =
    selectedDate?.getFullYear() === year && selectedDate.getMonth() + 1 === month;

  const days = new Array(daysInMonth).fill(0).map((_, index) => {
    const date = new Date(`${year}-${month}-${index + 1}`);
    return (
      <Day
        key={`day-${index}`}
        number={index + 1}
        isCurrentDate={index + 1 === currentDate}
        isSelected={selectedDayInThisMonth && index + 1 === selectedDate?.getDate()}
        onPress={() => onSelect(date)}
        disabled={dateDisabled ? dateDisabled(date) : false}
      />
    );
  });

  const rows = createChunks<ReactElement>([...fillersStart, ...days, ...fillersEnd], 7);

  return (
    <>
      {rows.map((chunk, ix) => (
        <View key={'row-' + ix} style={styles.rowStyle}>
          {chunk}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default Month;
