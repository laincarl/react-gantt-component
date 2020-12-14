import React, { useContext, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Context from '../../context';
import styles from './index.less';

const TimeAxis: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { store } = useContext(Context);
  const majorList = store.getMajorList();
  const minorList = store.getMinorList();
  useEffect(() => {
    if (ref.current) {
      store.initDragScrollHammer(ref.current);
    }
  }, [store]);
  return (
    <div
      ref={ref}
      className={styles['time-axis']}
      style={{
        left: store.tableWidth,
        width: store.viewWidth,
      }}
    >
      <div
        className={styles['render-chunk']}
        style={{
          transform: `translateX(-${store.translateX}px`,
        }}
      >
        {majorList.map(item => (
          <div
            key={item.key}
            className={styles.major}
            style={{ width: item.width, left: item.left }}
          >
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
        {minorList.map(item => (
          <div
            key={item.key}
            className={classNames(styles.minor, {
              // [styles.weekends]: item.isWeek,
            })}
            style={{ width: item.width, left: item.left }}
          >
            <div className={styles.label}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default observer(TimeAxis);
