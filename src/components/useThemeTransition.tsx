import { MouseEvent, useEffect } from "react";

function updateCSS(css: string, key: string) {
  let style = document.getElementById(key) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement("style");
    style.id = key;
    document.head.appendChild(style);
  }
  style.innerHTML = css;
}

const transitionStyle = `
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

[data-theme="dark"]::view-transition-old(root) {
  z-index: 1;
}

[data-theme="dark"]::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}

::view-transition-new(root) {
  z-index: 1;
}
`;

// Type for our hook return
type TriggerThemeTransition = (event: MouseEvent) => void;

/**
 * Hook that enables theme transitions (dark <-> light) with a ripple effect
 * from the click position using the View Transitions API.
 */
export function useThemeTransition(): TriggerThemeTransition {
  useEffect(() => {
    if (typeof (document as any).startViewTransition === "function") {
      updateCSS(transitionStyle, "view-transition-style");
    }
  }, []);

  const runClipPathAnimation = (shapes: string[], reverse: boolean) => {
    document.documentElement.animate(
      { clipPath: reverse ? [...shapes].reverse() : shapes },
      {
        duration: 500,
        easing: "ease-in",
        pseudoElement: reverse
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  };

  const triggerThemeTransition: TriggerThemeTransition = (event) => {
    if (!event || typeof (document as any).startViewTransition !== "function") {
      return;
    }

    const toLight =
      document.documentElement.getAttribute("data-theme") === "dark";

    const x = event.clientX;
    const y = event.clientY;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    (document as any)
      .startViewTransition(() => {
        const root = document.documentElement;
        root.setAttribute("data-theme", toLight ? "light" : "dark");
      })
      .ready.then(() => {
        const shapes = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ];
        runClipPathAnimation(shapes, toLight);
      });
  };

  return triggerThemeTransition;
}
