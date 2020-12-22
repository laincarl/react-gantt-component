import React from 'react';
import Gantt from '../src';
import createData from './utils/createData'

export default {
  title: 'Dependencies',
  component: Gantt,
}

const GanttStory = ({ data, ...args }) => (
  <div style={{ width: '100%', height: 500 }}>
    <Gantt
      data={[{
        id: '1',
        name: `一个名称1`,
        content: '一个名称',
        startDate: '2020-12-18 00:00:00',
        endDate: '2020-12-19 23:59:59',
        collapsed: false,
      }, {
        id: '2',
        name: `一个名称1`,
        content: '一个名称',
        startDate: '2020-12-17 00:00:00',
        endDate: '2020-12-25 23:59:59',
        collapsed: false,
      }, {
        id: '3',
        name: `一个名称1`,
        content: '一个名称',
        startDate: '2020-12-18 00:00:00',
        endDate: '2020-12-19 23:59:59',
        collapsed: false,
      }, {
        id: '4',
        name: `一个名称1`,
        content: '一个名称',
        startDate: '2020-12-18 00:00:00',
        endDate: '2020-12-19 23:59:59',
        collapsed: false,
      }]}
      dependencies={[{
        from: '1',
        to: '2',
        type: 'finish_start'
      }, {
        from: '2',
        to: '3',
        type: 'finish_start'
      }, {
        from: '2',
        to: '4',
        type: 'start_finish'
      }, {
        from: '2',
        to: '4',
        type: 'finish_finish'
      }, {
        from: '3',
        to: '4',
        type: 'start_start'
      }]}
      columns={[{
        name: 'name',
        label: '名称',
        flex: 2,
        minWidth: 200,
      }, {
        name: 'startDate',
        label: '开始时间',
        flex: 1,
        minWidth: 100,
      }, {
        name: 'endDate',
        label: '结束时间',
        flex: 1,
        minWidth: 100,
      }]}
      onUpdate={async () => {
        return true
      }}
      {...args}
    />
  </div>
)

export const Basic = GanttStory.bind({});

Basic.args = {
}