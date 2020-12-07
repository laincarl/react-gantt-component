import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GanttComponent from '../.';
import '../dist/react-gantt-component.cjs.development.css'

const App = () => {
  return (
    <div style={{ width: '100%', height: 500 }}>
    <GanttComponent
      data={[{
        name: '一个名称',
        startDate: '2020-10-01',
        endDate: '2020-10-08',
        collapsed: false,
        children: [{
          startDate: '2020-10-01',
          endDate: '2020-10-08',
          name: '一个名称',
          collapsed: false
        }]
      }]}
      columns={[{
        name: 'name',
        label: '名称',
      }]}
      onUpdate={async () => {
        return true
      }}
    />
  </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
