import Side from "@/components/Side";
import Icon from "@/components/icons/icon";
import { useThemeTransition } from "@/components/useThemeTransition";
import { socialMedia } from "@/config";
import { SideOrientation } from "@/types";
import { useState } from "react";

import styled from "styled-components";

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &:after {
    content: "";
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--green);
  }

  li {
    a {
      padding: 10px;

      &:hover,
      &:focus {
        transform: translateY(-3px);
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const SwitchThemeButton = styled.button`
  color: var(--green);
  background: transparent;
  height: 24px;
  width: 24px;
  padding: 0;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Social = () => {
  const [light, setLight] = useState<boolean>(false);
  const triggerThemeTransition = useThemeTransition();

  return (
    <Side orientation={SideOrientation.left}>
      <StyledSocialList>
        {socialMedia &&
          socialMedia.map(({ url, name }, i) => (
            <li key={i}>
              <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                <Icon name={name} />
              </a>
            </li>
          ))}
        <SwitchThemeButton
          type="button"
          onClick={(e) => {
            triggerThemeTransition(e);
            setLight((pre) => !pre);
          }}
        >
          <Icon name={light ? "Light" : "Dark"} />
        </SwitchThemeButton>
      </StyledSocialList>
    </Side>
  );
};

export default Social;
