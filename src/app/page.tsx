"use client";

import {
  About,
  Contact,
  Featured,
  Hero,
  Jobs,
  Layout,
  Projects,
} from "@/components";

import styled from "styled-components";

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => {
  return (
    <Layout>
      <StyledMainContainer className="fillHeight">
        <Hero />
        <About />
        <Jobs />
        <Featured />
        <Projects />
        <Contact />
      </StyledMainContainer>
    </Layout>
  );
};

export default IndexPage;
