import { GanttProps } from '../../src';
export default function createData(count: number): GanttProps['data'] {
  return Array(count).fill({
    name: '一个名称',
    content: '一个名称',
    startDate: null,
    endDate: null,
    collapsed: false,
    children: [{
      startDate: null,
      endDate: null,
      name: '子级',
      content: '子级',
      collapsed: false
    }]
  })
}