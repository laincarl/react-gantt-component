import React from 'react';
import GanttComponent from '../src';
import createData, { GanttRecord } from './utils/createData'

export default {
  title: 'Basic',
  component: GanttComponent,
  argTypes: {
    rowHeight: { control: { type: 'range', min: 30, max: 100, step: 10 } },
    tableIndent: { control: { type: 'range', min: 20, max: 100, step: 1 } },
    unit: {
      control: {
        type: 'select',
        options: [
          'day',
          'week',
          'month',
          'quarter',
          'halfYear',
        ],
      }
    },
  },
}

const GanttStory = ({ data, ...args }) => (
  <div style={{ width: '100%', height: 500 }}>
    <GanttComponent<GanttRecord>
      data={createData(100)}
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
      onUpdate={async (item) => {
        return true
      }}
      renderBarThumb={(record) => record.content}
      {...args}
    />
  </div>
)

export const Basic = GanttStory.bind({});

Basic.args = {
  rowHeight: 30,
  tableIndent: 20,
  showBackToday: true,
  showUnitSwitch: true,
  tableCollapseAble: true,
  unit: 'day'
}