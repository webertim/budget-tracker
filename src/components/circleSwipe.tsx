import { ComponentType, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

type Props<T> = {
  ChildComponent: ComponentType<{ index: number } & T>;
  childProps: T;
};

const CircleSwipe = <T,>({ ChildComponent, childProps }: Props<T>) => {
  const [startX, setStartX] = useState(0);
  const [index, setIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (
    position: 'left' | 'right' | 'center',
    behavior: 'smooth' | 'instant'
  ) => {
    if (!scrollContainerRef.current)
      return new Promise<void>((resolve) => resolve());

    const multiplier = position === 'left' ? 0 : position === 'center' ? 1 : 2;
    const targetPosition = multiplier * scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: targetPosition,
      behavior,
    });

    return new Promise<void>((resolve, reject) => {
      if (!scrollContainerRef.current) return;
      const failed = setTimeout(() => {
        reject();
      }, 20000);

      const scrollHandler = () => {
        if (!scrollContainerRef.current) return;
        if (
          Math.abs(scrollContainerRef.current.scrollLeft - targetPosition) < 1
        ) {
          window.removeEventListener('scroll', scrollHandler);
          clearTimeout(failed);
          resolve();
        }
      };
      if (scrollContainerRef.current.scrollLeft === targetPosition) {
        clearTimeout(failed);
        resolve();
      } else {
        scrollContainerRef.current.addEventListener('scroll', scrollHandler);
      }
    });
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    scroll('center', 'instant');
  }, [index]);

  const handleTouchStart = () => {
    if (!scrollContainerRef.current) return;
    setStartX(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchEnd = async () => {
    if (!scrollContainerRef.current) return;

    const endX = scrollContainerRef.current.scrollLeft;
    const deltaX = endX - startX;

    if (Math.abs(deltaX) === 0) {
      return;
    }
    scrollContainerRef.current.style.overflow = 'hidden';

    if (Math.abs(deltaX) < scrollContainerRef.current.clientWidth / 4) {
      await scroll('center', 'smooth');
      scrollContainerRef.current.style.overflow = 'auto';
      return;
    }

    const newIndex = deltaX > 0 ? index + 1 : index - 1;

    await scroll(newIndex > index ? 'right' : 'left', 'smooth');
    setTimeout(() => {
      flushSync(() => {
        setIndex(newIndex);
        scroll('center', 'instant');
      });
    });
    scrollContainerRef.current.style.overflow = 'auto';
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex items-center overflow-auto no-momentum-scroll"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="min-w-full">
        <ChildComponent index={index - 1} {...childProps} key={index - 1} />
      </div>
      <div className="min-w-full">
        <ChildComponent index={index} {...childProps} key={index} />
      </div>
      <div className="min-w-full">
        <ChildComponent index={index + 1} {...childProps} key={index + 1} />
      </div>
    </div>
  );
};

export default CircleSwipe;
