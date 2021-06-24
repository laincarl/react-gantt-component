import { GanttProps } from '../../src';
export interface GanttRecord {
  id: string
  name: string
  content: string
  startDate: string | null,
  endDate: string | null,
}
export default function createData(count: number): GanttProps<GanttRecord>['data'] {
  return Array(count).fill(0).map((_, i) => ({
    id: i.toString(),
    name: `一个名称${i}`,
    content: '一个名称',
    startDate: null,
    endDate: null,
    collapsed: false,
    children: [{
      id: `${i}-child`,
      startDate: null,
      endDate: null,
      name: '子级',
      content: '子级',
      collapsed: false,
      children: []
    }]
  }))
}