"use client";

import { SideOrientation } from "@/types";
import { cubicBezier, motion } from "framer-motion";

import { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledSideElement = styled.div<{ $orientation: SideOrientation }>`
  width: 40px;
  position: fixed;
  bottom: 0;
  left: ${(props) =>
    props.$orientation === SideOrientation.left ? "40px" : "auto"};
  right: ${(props) =>
    props.$orientation === SideOrientation.left ? "auto" : "40px"};
  z-index: 10;
  color: var(--green);

  @media (max-width: 1080px) {
    left: ${(props) =>
      props.$orientation === SideOrientation.left ? "20px" : "auto"};
    right: ${(props) =>
      props.$orientation === SideOrientation.left ? "auto" : "20px"};
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Side = ({
  children,
  orientation,
}: PropsWithChildren<{
  orientation: SideOrientation;
}>) => (
  <StyledSideElement $orientation={orientation}>
    <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ delay: 5, ease: cubicBezier(0.645, 0.045, 0.355, 1) }}
    >
      {children}
    </motion.div>
  </StyledSideElement>
);

export default Side;
