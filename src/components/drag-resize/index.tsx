import React, { useCallback, useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { usePersistFn } from 'ahooks';
import { observer } from 'mobx-react-lite';
import AutoScroller from './AutoScroller';

interface Size {}
interface DragResizeProps extends React.HTMLProps<HTMLDivElement> {
  onResize: ({ width, x }: { width: number; x: number }) => void;
  /* 拖拽前的size */
  onResizeEnd: ({ width, x }: { width: number; x: number }) => void;
  onBeforeResize?: () => void;
  minWidth: number;
  type: 'left' | 'right' | 'move';
  grid?: number;
  scroller?: HTMLElement;
  defaultSize: {
    width: number;
    x: number;
  };
  onAutoScroll: (delta: number) => void;
  /* 点击就算开始 */
  clickStart?: boolean;
}
const snap = (n: number, size: number): number => Math.round(n / size) * size;
const DragResize: React.FC<DragResizeProps> = ({
  type,
  onBeforeResize,
  onResize,
  onResizeEnd,
  minWidth,
  grid,
  defaultSize: { x: defaultX, width: defaultWidth },
  scroller,
  onAutoScroll,
  clickStart = false,
  children,
  ...otherProps
}) => {
  const [resizing, setResizing] = useState(false);
  const handleAutoScroll = usePersistFn((delta: number) => {
    updateSize();
    onAutoScroll(delta);
  });
  const autoScroll = useMemo(
    () => new AutoScroller({ scroller, onAutoScroll: handleAutoScroll }),
    [handleAutoScroll, scroller]
  );
  const positionRef = useRef({
    clientX: 0,
    width: defaultWidth,
    x: defaultX,
  });
  const moveRef = useRef({
    clientX: 0,
  });
  const updateSize = usePersistFn(() => {
    const distance =
      moveRef.current.clientX -
      positionRef.current.clientX +
      autoScroll.autoScrollPos;
    switch (type) {
      case 'left': {
        let width = positionRef.current.width - distance;
        if (minWidth !== undefined) {
          width = Math.max(width, minWidth);
        }
        if (grid) {
          width = snap(width, grid);
        }
        const pos = width - positionRef.current.width;
        const x = positionRef.current.x - pos;
        onResize({ width, x });
        break;
      }
      // 向右，x不变，只变宽度
      case 'right': {
        let width = positionRef.current.width + distance;
        if (minWidth !== undefined) {
          width = Math.max(width, minWidth);
        }
        if (grid) {
          width = snap(width, grid);
        }
        const { x } = positionRef.current;
        onResize({ width, x });
        break;
      }
      case 'move': {
        const { width } = positionRef.current;
        let rightDistance = distance;
        if (grid) {
          rightDistance = snap(distance, grid);
        }
        const x = positionRef.current.x + rightDistance;
        onResize({ width, x });
        break;
      }
    }
  });
  const handleMouseMove = usePersistFn((event: MouseEvent) => {
    if (!resizing) {
      setResizing(true);
      if (!clickStart) {
        onBeforeResize && onBeforeResize();
      }
    }
    moveRef.current.clientX = event.clientX;
    updateSize();
  });

  const handleMouseUp = usePersistFn(() => {
    autoScroll.stop();
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    if (resizing) {
      setResizing(false);
      onResizeEnd({
        x: positionRef.current.x,
        width: positionRef.current.width,
      });
    }
  });
  const handleMouseDown = usePersistFn(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      if (scroller) {
        autoScroll.start();
      }
      if (clickStart) {
        onBeforeResize && onBeforeResize();
        setResizing(true);
      }
      positionRef.current.clientX = event.clientX;
      positionRef.current.x = defaultX;
      positionRef.current.width = defaultWidth;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  );

  return (
    <div role="none" onMouseDown={handleMouseDown} {...otherProps}>
      {resizing &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: 9999,
              cursor: 'col-resize',
            }}
          />,
          document.body
        )}
      {children}
    </div>
  );
};
export default observer(DragResize);
