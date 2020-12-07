import React from 'react';
import { Meta, Story } from '@storybook/react';
import Gantt, { GanttProps } from '../src';
const meta: Meta = {
  title: 'Welcome',
  component: Gantt,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<GanttProps> = () =>
  <div style={{ width: '100%', height: 500 }}>
    <Gantt
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
  </div>;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});