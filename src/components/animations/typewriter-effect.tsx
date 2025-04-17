import { useRef, useEffect } from "react";
import Typed from "typed.js";

interface TypewriterEffectProps {
  text: string;
  onComplete?: () => void;
}

export function TypewriterEffect({
  text,
  onComplete,
}: TypewriterEffectProps): JSX.Element {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!el.current) return;
    const typed = new Typed(el.current, {
      strings: [text],
      typeSpeed: 50,
      showCursor: true,
      cursorChar: "|",
      onComplete: () => {
        if (onComplete) {
          onComplete();
        }
      },
    });
    return () => typed.destroy();
  }, [text, onComplete]);
  return <span ref={el} />;
}
