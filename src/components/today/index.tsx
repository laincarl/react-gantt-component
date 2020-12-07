import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context';
import styles from './index.less';

const Today: React.FC = () => {
  const { store } = useContext(Context);
  return (
    <div
      className={styles.today}
      style={{
        transform: `translate(${store.todayTranslateX}px)`,
      }}
    >
      今日
      <div
        className={styles.today_line}
        style={{
          height: store.bodyScrollHeight,
        }}
      />
    </div>
  );
};
export default observer(Today);
