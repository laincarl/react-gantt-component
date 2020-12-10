import React, { useContext, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import useDragResize from '../../hooks/useDragResize';
import Context from '../../context';
import styles from './index.less';

const Divider: React.FC = () => {
  const { store, tableCollapseAble } = useContext(Context);
  const { tableWidth } = store;
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      store.toggleCollapse();
    },
    [store]
  );
  const left = tableWidth;

  const handleResize = useCallback(
    ({ width }: { width: number }) => {
      store.handleResizeTableWidth(width);
    },
    [store]
  );
  const [handleMouseDown, resizing] = useDragResize(handleResize, {
    initSize: {
      width: tableWidth,
    },
    minWidth: 200,
    maxWidth: store.width * 0.6,
  });
  return (
    <div
      role="none"
      className={classNames(styles.divider, {
        [styles.divider_only]: !tableCollapseAble,
      })}
      style={{ left: left - 1 }}
      onMouseDown={tableWidth === 0 ? undefined : handleMouseDown}
    >
      {resizing && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 9999,
            cursor: 'col-resize',
          }}
        />
      )}
      <hr />
      {tableCollapseAble && (
        <div
          className={styles['icon-wrapper']}
          role="none"
          onMouseDown={e => e.stopPropagation()}
          onClick={handleClick}
        >
          <i
            className={classNames(styles.arrow, {
              [styles.reverse]: left <= 0,
            })}
          />
        </div>
      )}
    </div>
  );
};
export default observer(Divider);
