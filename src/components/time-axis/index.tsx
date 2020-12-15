import React, { useContext, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Context from '../../context';
import './index.less';

const TimeAxis: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { store, prefixCls } = useContext(Context);
  const prefixClsTimeAxis = `${prefixCls}-time-axis`;
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
      className={prefixClsTimeAxis}
      style={{
        left: store.tableWidth,
        width: store.viewWidth,
      }}
    >
      <div
        className={`${prefixClsTimeAxis}-render-chunk`}
        style={{
          transform: `translateX(-${store.translateX}px`,
        }}
      >
        {majorList.map(item => (
          <div
            key={item.key}
            className={`${prefixClsTimeAxis}-major`}
            style={{ width: item.width, left: item.left }}
          >
            <div className={`${prefixClsTimeAxis}-label`}>{item.label}</div>
          </div>
        ))}
        {minorList.map(item => (
          <div
            key={item.key}
            className={classNames(`${prefixClsTimeAxis}-minor`, {
              // [styles.weekends]: item.isWeek,
            })}
            style={{ width: item.width, left: item.left }}
          >
            <div className={`${prefixClsTimeAxis}-label`}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default observer(TimeAxis);
