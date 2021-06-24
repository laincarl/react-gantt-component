import React from 'react';
import Gantt from '../src';
import createData from './utils/createData'

export default {
  title: 'Large data',
  component: Gantt,
}

const GanttStory = ({ data, ...args }) => (
  <div style={{ width: '100%', height: 500 }}>
    <Gantt
      data={createData(1000)}
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
      onUpdate={async (item, startDate, endDate) => {
        item.startDate = startDate;
        item.endDate = endDate;
        return true
      }}
      renderBarThumb={(record) => record.content}
      {...args}
    />
  </div>
)

export const Basic = GanttStory.bind({});

Basic.args = {
}