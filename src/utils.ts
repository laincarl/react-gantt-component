/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import dayjs from 'dayjs';
import { Gantt } from './types';
import { MOVE_SPACE } from './constants';

/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 */
export function flattenDeep(
  arr: Gantt.Item[] = [],
  depth = 0,
  parent: Gantt.Item | undefined = undefined
): Gantt.Item[] {
  let index = 0;
  return arr.reduce((flat: Gantt.Item[], item) => {
    item._depth = depth;
    item._parent = parent;
    item._index = index;
    index += 1;
    return [
      ...flat,
      item,
      ...(item.children && !item.collapsed
        ? flattenDeep(item.children, depth + 1, item)
        : []),
    ];
  }, []);
}

export function getMoveStep(
  isLeft: boolean,
  isShrink: boolean,
  sight: Gantt.Sight,
  pxUnitAmp: number,
  barInfo: Gantt.Bar
) {
  const { translateX, width } = barInfo;
  const startX = isLeft ? translateX : translateX + width;
  const startDate = dayjs(startX * pxUnitAmp);

  const getDayStep = () => {
    let endDate = startDate.endOf('day');

    // 左侧收缩
    if (isShrink && isLeft) {
      endDate = startDate.add(1, 'day').startOf('day');
    }

    // 右侧扩展
    if (!isShrink && isLeft) {
      endDate = startDate.startOf('day');
    }

    // 右侧收缩
    if (isShrink && !isLeft) {
      endDate = startDate.add(-1, 'day').endOf('day');
    }

    let step = (24 * 60 * 60 * 1000) / pxUnitAmp;
    const diff = (endDate.valueOf() - startDate.valueOf()) / pxUnitAmp;
    if (diff > MOVE_SPACE) {
      step = diff;
    }

    return step;
  };

  const getWeekStep = () => {
    let endDate = startDate
      .weekday(1)
      .hour(0)
      .minute(0)
      .second(0);
    if ((isLeft && isShrink) || (!isLeft && !isShrink)) {
      endDate = endDate
        .weekday(7)
        .hour(23)
        .minute(59)
        .second(59);
    }

    let step = (7 * 24 * 60 * 60 * 1000) / pxUnitAmp;
    const diff = Math.abs(endDate.valueOf() / pxUnitAmp - startX);
    if (diff > MOVE_SPACE) {
      step = diff;
    }

    return step;
  };

  const getMonthStep = () => {
    let month = -1;
    let endDate2 = startDate.startOf('month');
    // 向右侧移动
    if ((isLeft && isShrink) || (!isLeft && !isShrink)) {
      month = 1;
      endDate2 = startDate.endOf('month');
    }

    const endDate = startDate.add(month, 'month');
    let step = Math.abs(endDate.valueOf() / pxUnitAmp - startX);

    const diff = Math.abs(endDate2.valueOf() / pxUnitAmp - startX);
    if (diff > 5) {
      step = diff;
    }

    return step;
  };

  const map = {
    day() {
      return getDayStep();
    },
    week() {
      return getWeekStep();
    },
    month() {
      return getWeekStep();
    },
    quarter() {
      return getMonthStep();
    },
    halfYear() {
      return getMonthStep();
    },
  };

  const step = map[sight]();
  return step;
}

export function getMaxRange(bar: Gantt.Bar) {
  let minTranslateX = 0;
  let maxTranslateX = 0;
  const temp: Gantt.Bar[] = [bar];

  while (temp.length > 0) {
    const current = temp.shift();
    if (current) {
      const { translateX = 0, width = 0 } = current;
      if (minTranslateX === 0) {
        minTranslateX = translateX || 0;
      }
      if (translateX) {
        minTranslateX = Math.min(translateX, minTranslateX);
        maxTranslateX = Math.max(translateX + width, maxTranslateX);
      }
      if (current.task.children && current.task.children.length > 0) {
        current.task.children.forEach(t => {
          if (t._bar) {
            temp.push(t._bar);
          }
        });
      }
    }
  }

  return {
    translateX: minTranslateX,
    width: maxTranslateX - minTranslateX,
  };
}
const genKey = (() => {
  let key = 0;
  return function() {
    return key++;
  };
})();
export function transverseData(
  data: Gantt.Record[] = [],
  startDateKey: string,
  endDateKey: string
) {
  const result: Gantt.Item[] = [];

  data.forEach(record => {
    const item: Gantt.Item = {
      key: genKey(),
      record,
      // TODO content
      content: '',
      group: record.group,
      startDate: record[startDateKey] || '',
      endDate: record[endDateKey] || '',
      collapsed: record.collapsed || false,
      children: transverseData(record.children || [], startDateKey, endDateKey),
    };
    result.push(item);
  });
  return result;
}
