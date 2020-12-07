import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
// import { BackTop } from 'choerodon-ui';
import Context from '../../context';

const Divider: React.FC = () => {
  const { store } = useContext(Context);
  const { scrollTop } = store;
  if (scrollTop <= 100 || !store.mainElementRef.current) {
    return null;
  }
  return (
    // <BackTop className={styles.scroll_top} target={() => store.mainElementRef.current as HTMLElement}>
    <div />
    // </BackTop>
  );
};
export default observer(Divider);
