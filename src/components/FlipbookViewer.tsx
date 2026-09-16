import React, { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Download, BookOpen } from "lucide-react";
import type { FlipbookDocument } from "@/data/projects";

interface FlipbookViewerProps {
  document: FlipbookDocument;
  onClose: () => void;
}

const FlipbookViewer: React.FC<FlipbookViewerProps> = ({ document, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalPages = document.pages.length;

  const goToPage = useCallback(
    (page: number, direction: "next" | "prev") => {
      if (isFlipping || page < 0 || page >= totalPages) return;
      setIsFlipping(true);
      setFlipDirection(direction);
      setTimeout(() => {
        setCurrentPage(page);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 300);
    },
    [isFlipping, totalPages]
  );

  const goNext = useCallback(() => {
    if (currentPage < totalPages - 1) goToPage(currentPage + 1, "next");
  }, [currentPage, totalPages, goToPage]);

  const goPrev = useCallback(() => {
    if (currentPage > 0) goToPage(currentPage - 1, "prev");
  }, [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape") {
        onClose();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, onClose]);

  // Lock body scroll & pre-cache images
  useEffect(() => {
    document.pages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    const original = window.document.body.style.overflow;
    window.document.body.style.overflow = "hidden";
    return () => {
      window.document.body.style.overflow = original;
    };
  }, [document.pages]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40;
    if (diff > threshold) goNext();
    else if (diff < -threshold) goPrev();
  };

  const toggleFullscreen = () => {
    if (!window.document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else if (window.document.fullscreenElement) {
      window.document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!window.document.fullscreenElement);
    window.document.addEventListener("fullscreenchange", handler);
    return () => window.document.removeEventListener("fullscreenchange", handler);
  }, []);

  const progressPercent = ((currentPage + 1) / totalPages) * 100;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 bg-black/70 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <BookOpen size={16} className="text-white/60 shrink-0" />
          <h3 className="text-white text-sm font-medium truncate">
            {document.title}
          </h3>
          <span className="hidden sm:inline-block text-white/40 text-xs font-mono shrink-0">
            • {document.subtitle}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {document.pdfPath && document.pdfPath.endsWith(".pdf") && (
            <a
              href={document.pdfPath}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/15 rounded-lg transition-colors"
              title="Download PDF"
              onClick={(e) => e.stopPropagation()}
            >
              <Download size={13} />
              <span className="hidden sm:inline">Download PDF</span>
            </a>
          )}
          <button
            onClick={toggleFullscreen}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Close viewer"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Flipbook Stage */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden px-4 sm:px-14 py-4 select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ perspective: "2200px" }}
      >
        {/* Left Arrow Button */}
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="absolute left-3 sm:left-6 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 backdrop-blur-md shadow-xl border border-white/10"
          aria-label="Previous page"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Page Container with Clickzones */}
        <div className="relative max-h-[calc(100vh-160px)] max-w-full flex items-center justify-center">
          {/* Active Page Image */}
          <div
            className={`relative flex items-center justify-center transition-all duration-300 ${
              isFlipping
                ? flipDirection === "next"
                  ? "scale-[0.98] -rotate-1 opacity-75"
                  : "scale-[0.98] rotate-1 opacity-75"
                : "scale-100 rotate-0 opacity-100"
            }`}
          >
            <img
              src={document.pages[currentPage]}
              alt={`${document.title} - Page ${currentPage + 1} of ${totalPages}`}
              className="max-h-[calc(100vh-160px)] max-w-[90vw] md:max-w-[80vw] w-auto h-auto object-contain rounded-lg shadow-2xl ring-1 ring-white/10 select-none"
              draggable={false}
            />

            {/* Clickzones for natural page turning on click */}
            <div
              onClick={goPrev}
              className={`absolute left-0 top-0 bottom-0 w-1/2 cursor-w-resize z-20 ${
                currentPage === 0 ? "pointer-events-none" : ""
              }`}
              title="Click for previous page"
            />
            <div
              onClick={goNext}
              className={`absolute right-0 top-0 bottom-0 w-1/2 cursor-e-resize z-20 ${
                currentPage === totalPages - 1 ? "pointer-events-none" : ""
              }`}
              title="Click for next page"
            />
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={goNext}
          disabled={currentPage === totalPages - 1}
          className="absolute right-3 sm:right-6 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center disabled:opacity-0 disabled:pointer-events-none transition-all duration-200 backdrop-blur-md shadow-xl border border-white/10"
          aria-label="Next page"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Bottom Controls & Progress Track */}
      <div className="px-6 py-3 bg-black/70 border-t border-white/10 shrink-0 flex flex-col items-center gap-2">
        {/* Progress Track */}
        <div className="w-full max-w-md h-1 bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Page status & controls info */}
        <div className="flex items-center justify-between w-full max-w-md text-xs font-mono text-white/60">
          <span>Tap edge or press ← / →</span>
          <span className="text-white font-medium">
            {currentPage + 1} / {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FlipbookViewer;
