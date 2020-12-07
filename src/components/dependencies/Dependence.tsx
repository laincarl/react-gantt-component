import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import find from 'lodash/find';
import Context from '../../context';
import styles from './Dependence.less';
import { Gantt } from '../../types';

interface DependenceProps {
  data: Gantt.Dependence;
}
const Dependence: React.FC<DependenceProps> = ({ data }) => {
  const { store } = useContext(Context);
  const { from, to } = data;
  const barList = store.getBarList;
  const fromBar = find(barList, bar => bar.task.issueId === from);
  const toBar = find(barList, bar => bar.task.issueId === to);
  if (!fromBar || !toBar) {
    return null;
  }
  return (
    <g stroke="#f0f0f0" className={styles['task-dependency-line']}>
      <path
        className={styles.line}
        d={`
          M${fromBar.translateX},${fromBar.translateY}
          L${toBar.translateX},${toBar.translateY}
          `}
        //   d="
        // M446005.99999999994,187
        // L446001.99999999994,187
        // L446001.99999999994,203
        // L446353.99999999994,203
        // L446353.99999999994,215
        // L446349.99999999994,215"
        strokeWidth="1"
        fill="none"
      />
    </g>
  );
};
export default observer(Dependence);
