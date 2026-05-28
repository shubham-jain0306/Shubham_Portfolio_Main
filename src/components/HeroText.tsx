import { useEffect, useState, useRef, useCallback } from "react";

const STATIC_TEXT = "A designer rooted in clarity and storytelling. Crafting ";
const PHRASES = [
  "bold brands.",
  "human connection.",
  "digital experiences.",
  "pixel-perfect interfaces.",
  "lasting value.",
];

const TYPING_SPEED = 70;   // ms per character typing
const DELETING_SPEED = 40; // ms per character deleting
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

const HeroText = () => {
  const staticWords = STATIC_TEXT.trim().split(" ");
  const [visibleCount, setVisibleCount] = useState(0);
  const [staggerDone, setStaggerDone] = useState(false);

  // Typewriter state
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Stagger the static words over ~4s
  useEffect(() => {
    const delayPerWord = 2000 / staticWords.length;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= staticWords.length) {
        clearInterval(interval);
        // Small delay before typewriter starts
        setTimeout(() => setStaggerDone(true), 300);
      }
    }, delayPerWord);
    return () => clearInterval(interval);
  }, [staticWords.length]);

  // Typewriter loop
  const tick = useCallback(() => {
    const currentPhrase = PHRASES[phraseIndex];

    if (!isDeleting) {
      // Typing
      const next = currentPhrase.slice(0, displayText.length + 1);
      setDisplayText(next);

      if (next === currentPhrase) {
        // Done typing - pause then start deleting
        timeoutRef.current = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPE);
        return;
      }
      timeoutRef.current = setTimeout(tick, TYPING_SPEED);
    } else {
      // Deleting
      const next = currentPhrase.slice(0, displayText.length - 1);
      setDisplayText(next);

      if (next === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        timeoutRef.current = setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      timeoutRef.current = setTimeout(tick, DELETING_SPEED);
    }
  }, [displayText, isDeleting, phraseIndex]);

  useEffect(() => {
    if (!staggerDone) return;
    timeoutRef.current = setTimeout(tick, TYPING_SPEED);
    return () => clearTimeout(timeoutRef.current);
  }, [staggerDone, tick]);

  return (
    <div className="relative">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] tracking-tight text-foreground">
        {/* Static words with blur-to-sharp stagger */}
        {staticWords.map((word, i) => (
          <span
            key={i}
            className="inline-block mr-[0.28em]"
            style={{
              opacity: i < visibleCount ? 1 : 0,
              filter: i < visibleCount ? "blur(0px)" : "blur(8px)",
              transform: i < visibleCount ? "translateY(0)" : "translateY(6px)",
              transitionDuration: "400ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transitionProperty: "opacity, filter, transform",
            }}
          >
            {word}
          </span>
        ))}

        {/* Typewriter portion */}
        {staggerDone && (
          <span className="inline">
            <span>{displayText}</span>
            <span
              className="inline-block w-[3px] ml-1 align-baseline"
              style={{
                height: "0.85em",
                backgroundColor: "hsl(var(--foreground))",
                animation: "cursorBlink 1s step-end infinite",
              }}
            />
          </span>
        )}
      </h1>

      {/* Diagonal light streak */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 h-full w-[60px]"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 55%, transparent 100%)",
            animation: "lightSweep 8s ease-in-out 5s infinite",
          }}
        />
      </div>
    </div>
  );
};

export default HeroText;
