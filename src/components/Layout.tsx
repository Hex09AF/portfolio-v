import Email from "@/components/Email";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Social from "@/components/Social";

import { GlobalStyle, theme } from "@/styles";
import { PropsWithChildren, useCallback, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {isLoading && <Loader finishLoading={finishLoading} />}

      {!isLoading && (
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
