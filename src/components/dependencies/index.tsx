import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context';
import Dependence from './Dependence';

const Dependencies: React.FC = () => {
  const { store } = useContext(Context);
  const { dependencies } = store;
  return (
    <>
      {dependencies.map(dependence => (
        <Dependence data={dependence} />
      ))}
    </>
  );
};
export default observer(Dependencies);
