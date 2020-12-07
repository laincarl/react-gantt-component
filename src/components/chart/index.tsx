import React, { useContext, useCallback, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Hammer from 'hammerjs';
import DragPresent from '../drag-present';
import BarList from '../bar-list';
import BarThumbList from '../bar-thumb-list';
import Today from '../today';
import Dependencies from '../dependencies';
import Context from '../../context';
import styles from './index.less';

const Chart: React.FC = () => {
  const { store } = useContext(Context);
  const {
    tableWidth,
    viewWidth,
    bodyScrollHeight,
    translateX,
    chartElementRef,
  } = store;
  const minorList = store.getMinorList();
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.persist();
      store.handleMouseMove(event);
    },
    [store]
  );
  const handleMouseLeave = useCallback(() => {
    store.handleMouseLeave();
  }, [store]);
  const chartRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chartRef.current) {
      // @ts-ignore
      chartElementRef.current = chartRef.current;
      const chartHammer = new Hammer(chartRef.current);
      store.setChartHammer(chartHammer);
      // store.initDragScrollHammer(chartRef.current);
      chartRef.current.addEventListener('wheel', store.handleWheel);
      return () => {
        chartRef.current?.removeEventListener('wheel', store.handleWheel);
      };
    }
    return () => {};
  }, [chartElementRef, store]);
  return (
    <div
      ref={chartRef}
      className={styles.chart}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        left: tableWidth,
        width: viewWidth,
        height: bodyScrollHeight,
      }}
    >
      <svg
        className={styles['chart-svg-renderer']}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={viewWidth}
        height={bodyScrollHeight}
        viewBox={`${translateX} 0 ${viewWidth} ${bodyScrollHeight}`}
      >
        <defs>
          <pattern
            id="repeat"
            width="4.5"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(70 50 50)"
          >
            <line stroke="#c6c6c6" strokeWidth="1px" y2="10" />
          </pattern>
        </defs>
        {minorList.map(item =>
          item.isWeek ? (
            <g key={item.key} stroke="#f0f0f0">
              <path d={`M${item.left}.5,0 L${item.left},${bodyScrollHeight}`} />
              <rect
                fill="url(#repeat)"
                opacity="0.5"
                strokeWidth="0"
                x={item.left}
                y={0}
                width={item.width}
                height={bodyScrollHeight}
              />
            </g>
          ) : (
            <g key={item.label} stroke="#f0f0f0">
              <path d={`M${item.left}.5,0 L${item.left},${bodyScrollHeight}`} />
            </g>
          )
        )}
        <DragPresent />
        <Dependencies />
      </svg>
      <div
        className={styles['render-chunk']}
        style={{
          height: bodyScrollHeight,
          transform: `translateX(-${translateX}px`,
        }}
      >
        <BarThumbList />
        <BarList />
        <Today />
      </div>
    </div>
  );
};
export default observer(Chart);
