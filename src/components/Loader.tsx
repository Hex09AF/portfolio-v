"use client";

import { IconLoader } from "@/components/icons";
import { cubicBezier, useAnimate } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: 0;
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
    }
  }
`;

const Loader = ({ finishLoading }: { finishLoading: () => void }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [
        ".loader .logo-wrapper",
        {
          opacity: [0, 1],
        },
        {
          duration: 0,
        },
      ],
      [
        ".loader #logo path",
        {
          pathLength: [0, 1],
        },
        {
          duration: 0.75,
          ease: cubicBezier(0.76, 0, 0.24, 1),
        },
      ],
      [
        ".loader #logo #B",
        {
          opacity: [0, 1],
        },
        {
          duration: 0.5,
          ease: cubicBezier(0.76, 0, 0.24, 1),
        },
      ],
      [
        ".loader #logo",
        {
          opacity: 0,
        },
        {
          delay: 0.75,
          duration: 0.3,
          ease: cubicBezier(0.76, 0, 0.24, 1),
        },
      ],
      [
        ".loader",
        {
          opacity: 0,
          zIndex: -1,
        },
        {
          duration: 0.2,
          ease: cubicBezier(0.76, 0, 0.24, 1),
        },
      ],
    ]).then(() => {
      finishLoading();
    });
  }, [animate, finishLoading]);

  return (
    <StyledLoader className="loader" ref={scope}>
      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

export default Loader;
