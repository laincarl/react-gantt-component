import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GanttComponent from '../src';

const App = () => {
  return (
    <div style={{ width: '100%', height: 500 }}>
    <GanttComponent
      data={[{
        name: '一个名称',
        children: [{
          name: '一个名称'
        }]
      }]}
      columns={[{
        name: 'name',
        label: '名称',
      }]}
      onUpdate={() => {
        return true
      }}
    />
  </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
