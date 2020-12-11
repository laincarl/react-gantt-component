import React, { useCallback, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context';
import styles from './index.less';
const ScrollTop: React.FC = () => {
  const { store, scrollTop: scrollTopConfig } = useContext(Context);
  const { scrollTop } = store;
  const handleClick = useCallback(() => {
    if (store.mainElementRef.current) {
      store.mainElementRef.current.scrollTop = 0;
    }
  }, []);
  if (scrollTop <= 100 || !store.mainElementRef.current) {
    return null;
  }
  return (
    <div
      className={styles.scroll_top}
      style={scrollTopConfig instanceof Object ? scrollTopConfig : undefined}
      onClick={handleClick}
    >
      <div />
    </div>
  );
};
export default observer(ScrollTop);
