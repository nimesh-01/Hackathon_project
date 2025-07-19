import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.inOut",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
}) => {
  const ref = useRef(null);
  const tlRef = useRef(null);
  const splitterRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current || !text) return;

    const el = ref.current;

    // Reset position
    el.style.position = splitType === "lines" ? "relative" : "static";

    // Split the text
    try {
      splitterRef.current = new GSAPSplitText(el, {
        type: splitType,
        absolute: splitType === "lines",
        linesClass: "split-line",
      });
    } catch (err) {
      console.error("SplitText init error:", err);
      return;
    }

    const targets =
      splitType === "lines"
        ? splitterRef.current.lines
        : splitType === "words"
        ? splitterRef.current.words
        : splitterRef.current.chars;

    if (!targets || targets.length === 0) {
      console.warn("No targets found");
      splitterRef.current?.revert();
      return;
    }

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity";
    });

    // Timeline animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true }); // infinite loop
    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    tlRef.current = tl;

    return () => {
      tlRef.current?.kill();
      splitterRef.current?.revert();
    };
  }, [text, delay, duration, ease, splitType, from, to]);

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
