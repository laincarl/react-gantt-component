import React from 'react';
import { storiesOf } from '@storybook/react';
import Gantt from '../src';
import createData from './utils/createData'

storiesOf('basic usage', module)
  .add('basic', () => <div style={{ width: '100%', height: 500 }}>
    <Gantt
      data={createData(10)}
      columns={[{
        name: 'name',
        label: '名称',
      }]}
      onUpdate={async () => {
        return true
      }}
    />
  </div>)
  .add('large data set', () => <div style={{ width: '100%', height: 500 }}>
    <Gantt
      data={createData(1000)}
      columns={[{
        name: 'name',
        label: '名称',
      }]}
      onUpdate={async () => {
        return true
      }}
    />
  </div>)