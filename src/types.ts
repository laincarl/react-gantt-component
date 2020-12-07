import { Dayjs } from 'dayjs';

export namespace Gantt {
  export interface Major {
    width: number;
    left: number;
    label: string;
  }
  export interface MajorAmp {
    label: string;
    startDate: Dayjs;
    endDate: Dayjs;
  }
  export interface Minor {
    width: number;
    left: number;
    label: string;
    isWeek: boolean;
    key: string;
  }
  export interface MinorAmp {
    label: string;
    startDate: Dayjs;
    endDate: Dayjs;
  }
  export type Sight = 'day' | 'week' | 'month' | 'quarter' | 'halfYear';
  export type MoveType = 'left' | 'right' | 'move' | 'create';
  export interface SightConfig {
    type: Sight;
    label: string;
    value: number;
  }
  export interface Bar {
    label: string;
    width: number;
    translateX: number;
    translateY: number;
    stepGesture: string;
    invalidDateRange: boolean;
    dateTextFormat: (startX: number) => string;
    task: Item;
    loading: boolean;
    _group?: boolean;
    _collapsed: boolean;
    _depth: number;
    _index?: number;
    _childrenCount: number;
    _parent?: Item;
  }
  export interface Item {
    startDate: string | null;
    endDate: string | null;
    collapsed: boolean;
    group?: boolean;
    children?: Item[];
    borderColor?: string;
    backgroundColor?: string;
    _parent?: Item;
    _bar?: Bar;
    _depth?: number;
    _index?: number;
    [key: string]: any;
  }
  export interface Column {
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    flex?: number;
    name: string;
    label: string;
    render?: (item: Item) => React.ReactNode;
  }
  export interface Dependence {
    from: string;
    to: string;
  }
}
