"use client";

import { Email, Footer, Loader, Nav, Social } from "@/components";
import { GlobalStyle, theme } from "@/styles";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {isLoading && isHome ? (
        // <Loader finishLoading={() => setIsLoading(false)} />
        ""
      ) : (
        <StyledContent>
          <Nav />
          <Social />
          <Email />

          <div id="content">
            {children}
            <Footer />
          </div>
        </StyledContent>
      )}
    </ThemeProvider>
  );
};

export default Layout;
