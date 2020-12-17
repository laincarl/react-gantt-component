import { GanttProps } from '../../src';
export interface GanttRecord {
  name: string
  content: string
}
export default function createData(count: number): GanttProps<GanttRecord>['data'] {
  return Array(count).fill(0).map((_, i) => ({
    name: `一个名称${i}`,
    content: '一个名称',
    startDate: null,
    endDate: null,
    collapsed: false,
    children: [{
      startDate: null,
      endDate: null,
      name: '子级',
      content: '子级',
      collapsed: false,
      children: []
    }]
  }))
}