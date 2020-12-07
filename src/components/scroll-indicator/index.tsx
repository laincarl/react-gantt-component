import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context';
import styles from './index.less';

const ScrollIndicator: React.FC = () => {
  const store = useContext(Context);

  return <div className={styles.chart}>ScrollIndicator</div>;
};
export default observer(ScrollIndicator);
