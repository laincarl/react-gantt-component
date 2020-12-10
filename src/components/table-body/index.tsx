/* eslint-disable no-underscore-dangle */
import React, { useContext, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import Context from '../../context';
import styles from './index.less';
import { ROW_HEIGHT, TOP_PADDING } from '../../constants';
import RowToggler from './RowToggler';

const TableRows = () => {
  const { store, onRow, tableIndent, expandIcon } = useContext(Context);
  const { columns } = store;
  const columnsWidth = store.getColumnsWidth;
  const barList = store.getBarList;
  const { count, start } = store.getVisibleRows;
  if (barList.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          color: ' rgba(0,0,0,0.65)',
        }}
      >
        暂无数据
      </div>
    );
  }
  return (
    <>
      {barList.slice(start, start + count).map((bar, rowIndex) => {
        // 父元素如果是其最后一个祖先的子，要隐藏上一层的线
        const parent = bar._parent;
        const parentItem = parent?._parent;
        let isLastChild = false;
        if (parentItem?.children) {
          if (
            parentItem.children[parentItem.children.length - 1] === bar._parent
          ) {
            isLastChild = true;
          }
        }
        return (
          <div
            role="none"
            className={styles.row}
            style={{
              height: ROW_HEIGHT,
              top: (rowIndex + start) * ROW_HEIGHT + TOP_PADDING,
            }}
            onClick={() => {
              onRow?.onClick(bar.task);
            }}
          >
            {columns.map((column, index) => (
              <div
                key={column.name}
                className={styles.cell}
                style={{
                  width: columnsWidth[index],
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth,
                  paddingLeft:
                    index === 0 ? tableIndent * (bar._depth + 1) + 10 : 12,
                }}
              >
                {index === 0 &&
                  Array(bar._depth)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        className={classNames(styles['row-indentation'], {
                          [styles['row-indentation-hidden']]:
                            isLastChild && i === bar._depth - 2,
                          [styles['row-indentation-both']]:
                            i === bar._depth - 1,
                        })}
                        style={{
                          left: tableIndent * i + 15,
                          width: tableIndent * 1.5 + 5,
                        }}
                      />
                    ))}
                {index === 0 && bar._childrenCount > 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: tableIndent * bar._depth + 15,
                      background: 'white',
                      zIndex: 9,
                      transform: 'translateX(-52%)',
                    }}
                  >
                    {expandIcon ? (
                      expandIcon({
                        level: bar._depth,
                        collapsed: bar._collapsed,
                        onClick: event => {
                          event.stopPropagation();
                          store.setRowCollapse(bar.task, !bar._collapsed);
                        },
                      })
                    ) : (
                      <RowToggler
                        level={bar._depth}
                        collapsed={bar._collapsed}
                        onClick={event => {
                          event.stopPropagation();
                          store.setRowCollapse(bar.task, !bar._collapsed);
                        }}
                      />
                    )}
                  </div>
                )}
                {/* @ts-ignore */}
                <span className={styles.ellipsis}>
                  {column.render
                    ? column.render(bar.task)
                    : bar.task[column.name]}
                </span>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};
const ObserverTableRows = observer(TableRows);
const TableBorders = () => {
  const { store } = useContext(Context);
  const { columns } = store;
  const columnsWidth = store.getColumnsWidth;
  const barList = store.getBarList;
  if (barList.length === 0) {
    return null;
  }
  return (
    <div role="none" className={styles.border_row}>
      {columns.map((column, index) => (
        <div
          key={column.name}
          className={styles.cell}
          style={{
            width: columnsWidth[index],
            minWidth: column.minWidth,
            maxWidth: column.maxWidth,
          }}
        />
      ))}
    </div>
  );
};
const ObserverTableBorders = observer(TableBorders);

const TableBody: React.FC = () => {
  const { store } = useContext(Context);
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
  return (
    <div
      className={styles.scrollable}
      style={{
        width: store.tableWidth,
        height: store.bodyScrollHeight,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ObserverTableBorders />
      <ObserverTableRows />
    </div>
  );
};
export default observer(TableBody);
