'use client';

import { useState, useCallback, useEffect } from 'react';
import { mergeClasses as cn } from '@/lib/utils';

interface SlideImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: SlideImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function ImageSlider({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  className,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext, images.length]);

  if (!images.length) return null;

  return (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden rounded-[32px] bg-slate-100',
        className
      )}
    >
      {/* Slides - stacked with opacity/translate animation */}
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 transition-opacity duration-500',
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          )}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Pagination Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer',
                index === currentIndex
                  ? 'bg-blue-500 w-3 h-3'
                  : 'bg-white/60 hover:bg-white/80'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageSlider;
