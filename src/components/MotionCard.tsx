import { useSpringVector } from "@/hooks";
import { motion, useTransform } from "framer-motion";
import {
  MouseEventHandler,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { styled } from "styled-components";

/**
 * return a value that has been rounded to a set precision
 * @param {Number} value the value to round
 * @param {Number} precision the precision (decimal places), default: 3
 * @returns {Number}
 */
const round = (value: number, precision = 3) =>
  parseFloat(value.toFixed(precision));

/**
 * return a value that has been limited between min & max
 * @param {Number} value the value to clamp
 * @param {Number} min minimum value to allow, default: 0
 * @param {Number} max maximum value to allow, default: 100
 * @returns {Number}
 */
const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);

const MotionCardWrapper = styled(motion.div)`
  max-width: 300px;
  width: 100%;
  height: 100%;

  transform-style: preserve-3d;
  perspective: 600px;
  will-change: transform, box-shadow;
  transform-origin: center;
  z-index: 10;

  > * {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    .card__translater,
    .card__rotator {
      transform: none !important;
    }
  }

  .card__translater,
  .card__rotator {
    display: grid;
    perspective: 600px;
    transform-origin: center;
  }

  .card__rotator {
    transform: rotateY(0) rotateX(0);
    transform-style: preserve-3d;
    * {
      width: 100%;
      transform-style: preserve-3d;
      backface-visibility: visible;
    }
  }
`;

function MotionCard({ children }: PropsWithChildren) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const springInteractSettings = { stiffness: 1000, damping: 100, mass: 5 };
  const springPopSettings = { stiffness: 400, damping: 70, mass: 1 };
  const springRotateInteract = useSpringVector(
    { x: 0, y: 0 },
    springInteractSettings
  );
  const springTranslate = useSpringVector(
    { x: 0, y: 0 },
    springInteractSettings
  );
  const springRotatePop = useSpringVector({ x: 0, y: 0 }, springPopSettings);
  const springRotateX = useTransform<number, number>(
    [springRotateInteract.x, springRotatePop.x],
    ([xIn, xPop]) => xIn + xPop
  );
  const springRotateY = useTransform<number, number>(
    [springRotateInteract.y, springRotatePop.y],
    ([yIn, yPop]) => yIn + yPop
  );

  const [activeCard, setActiveCard] = useState<boolean | null>(null);

  /**
   * --- Handle hover ---
   */
  const hoverInteract: MouseEventHandler<HTMLDivElement> = (mouseEvent) => {
    const element = mouseEvent.currentTarget;
    // get element's current size/position
    const rect = element.getBoundingClientRect();

    const mousePos = {
      // get mouse position from left
      x: mouseEvent.clientX - rect.left,
      // get mouse position from right
      y: mouseEvent.clientY - rect.top,
    };

    // Mouse at Center: (50, 50)
    // Mouse at Top left:(0, 0)
    const percent = {
      x: clamp(round((100 / rect.width) * mousePos.x)),
      y: clamp(round((100 / rect.height) * mousePos.y)),
    };

    // normalizing the center
    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    // This maps the pointer distance from the center to degrees of rotation.
    // Dividing by 3.5 and 2 to scale it down to a realistic rotation (not too aggressive).
    springRotateInteract.set({
      // x is used to rotate on the Y-axis (horizontal mouse movement, element tilt left/right)
      x: round(-(center.x / 2)),
      // y is used to rotate on the X-axis (vertical movement, element tilt forward/back)
      y: round(center.y / 2),
    });
  };

  const hoverInteractEnd: MouseEventHandler<HTMLDivElement> = () => {
    springRotateInteract.set({ x: 0, y: 0 });
  };

  /**
   * --- Handle click ---
   */
  const onClick = () => {
    setActiveCard((preState) => !preState);
  };

  const moveCardToCenter = useCallback(() => {
    const rect = cardRef.current!.getBoundingClientRect();
    const view = document.documentElement;
    const delta = {
      x: round(view.clientWidth / 2 - rect.x - rect.width / 2),
      y: round(view.clientHeight / 2 - rect.y - rect.height / 2),
    };
    springTranslate.set({ x: delta.x, y: delta.y });
  }, [springTranslate]);

  const popOver = useCallback(() => {
    moveCardToCenter();
    springRotatePop.set({ x: 360, y: 0 });
  }, [moveCardToCenter, springRotatePop]);

  const popOut = useCallback(() => {
    springTranslate.set({ x: 0, y: 0 });
    springRotatePop.set({ x: 0, y: 0 });
  }, [springRotatePop, springTranslate]);

  useEffect(() => {
    if (activeCard) {
      popOver();
    } else {
      popOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCard]);

  /**
   * --- Re-center when scrolling
   */
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const scrollHandler = () => {
      setActiveCard(false);
    };

    window.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", scrollHandler);
    };
  }, []);

  return (
    <MotionCardWrapper ref={cardRef}>
      <motion.div
        className="card__translater"
        style={{
          x: springTranslate.x,
          y: springTranslate.y,
        }}
      >
        <motion.div
          onClick={onClick}
          onPointerMove={hoverInteract}
          onMouseOut={hoverInteractEnd}
          style={{
            rotateX: springRotateY,
            rotateY: springRotateX,
          }}
          className="card__rotator"
          tabIndex={-1}
        >
          <div className="card__content">{children}</div>
        </motion.div>
      </motion.div>
    </MotionCardWrapper>
  );
}

export default MotionCard;
