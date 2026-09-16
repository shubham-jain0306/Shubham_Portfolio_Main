import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SocialCarousel } from "@/data/projects";

interface SocialCarouselViewerProps {
  carousel: SocialCarousel;
}

export const SocialCarouselViewer: React.FC<SocialCarouselViewerProps> = ({
  carousel,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const totalSlides = carousel.slides.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) nextSlide();
    else if (diff < -45) prevSlide();
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-card/40 p-5 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:border-border">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            Multi-Slide Carousel
          </span>
          <h4 className="text-foreground text-base sm:text-lg font-medium mt-0.5">
            {carousel.title}
          </h4>
        </div>
        <span className="text-muted-foreground text-xs font-mono">
          Slide {currentSlide + 1} of {totalSlides}
        </span>
      </div>

      <p className="text-muted-foreground/80 text-xs sm:text-sm mb-5 leading-relaxed max-w-xl">
        {carousel.subtitle}
      </p>

      {/* Carousel Container */}
      <div className="relative mx-auto max-w-[480px] w-full">
        <div
          className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900/60 shadow-md select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slide Track */}
          <div
            className="flex w-full h-full transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {carousel.slides.map((slideSrc, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 relative overflow-hidden"
              >
                <img
                  src={slideSrc}
                  alt={`${carousel.title} — Slide ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none shadow-lg border border-white/10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none shadow-lg border border-white/10"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>

          {/* Slide Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/90">
            {currentSlide + 1} / {totalSlides}
          </div>
        </div>

        {/* Indicator Dots below image */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {carousel.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "w-6 bg-foreground"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Jump to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialCarouselViewer;
