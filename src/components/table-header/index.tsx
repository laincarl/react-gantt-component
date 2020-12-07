import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context';
import styles from './index.less';

const TableHeader: React.FC = () => {
  const { store } = useContext(Context);
  const { columns, tableWidth } = store;
  const width = tableWidth;
  const columnsWidth = store.getColumnsWidth;
  return (
    <div className={styles.scrollable} style={{ width, height: 56 }}>
      <div className={styles.head} style={{ width, height: 56 }}>
        <div className={styles.row} style={{ height: 56 }}>
          {columns.map((column, index) => (
            <div
              key={column.name}
              className={styles.cell}
              style={{
                width: columnsWidth[index],
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
            >
              <div className={styles['head-cell']}>
                <span className={styles.ellipsis}>{column.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default observer(TableHeader);
