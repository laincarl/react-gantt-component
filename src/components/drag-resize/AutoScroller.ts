class AutoScroller {
  constructor({
    scroller,
    rate = 5,
    space = 50,
    onAutoScroll,
  }: {
    scroller?: HTMLElement;
    rate?: number;
    space?: number;
    onAutoScroll: (delta: number) => void;
  }) {
    this.scroller = scroller || null;
    this.rate = rate;
    this.space = space;
    this.onAutoScroll = onAutoScroll;
  }

  rate: number;

  space: number;

  scroller: HTMLElement | null = null;

  autoScrollPos: number = 0;

  clientX: number | null = null;

  scrollTimer: number | null = null;

  onAutoScroll: (delta: number) => void;

  handleDraggingMouseMove = (event: MouseEvent) => {
    this.clientX = event.clientX;
  };

  handleScroll = (position: 'left' | 'right') => {
    if (position === 'left') {
      this.autoScrollPos -= this.rate;
      this.onAutoScroll(-this.rate);
    } else if (position === 'right') {
      this.autoScrollPos += this.rate;
      this.onAutoScroll(this.rate);
    }
  };

  start = () => {
    this.autoScrollPos = 0;
    document.addEventListener('mousemove', this.handleDraggingMouseMove);
    // 到最左或最右，停止滚动
    const scrollFunc = () => {
      if (this.scroller && this.clientX !== null) {
        if (
          this.clientX + this.space >
          this.scroller?.getBoundingClientRect().right
        ) {
          this.handleScroll('right');
        } else if (
          this.clientX - this.space <
          this.scroller?.getBoundingClientRect().left
        ) {
          this.handleScroll('left');
        }
      }

      this.scrollTimer = requestAnimationFrame(scrollFunc);
    };
    this.scrollTimer = requestAnimationFrame(scrollFunc);
  };

  // 停止自动滚动
  stop = () => {
    document.removeEventListener('mousemove', this.handleDraggingMouseMove);
    if (this.scrollTimer) {
      cancelAnimationFrame(this.scrollTimer);
    }
  };
}
export default AutoScroller;
