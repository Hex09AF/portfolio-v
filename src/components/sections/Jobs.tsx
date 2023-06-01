"use client";

import StdioJob from "@/docs/stdio.mdx";
import { KEY_CODES } from "@/utils";
import { motion } from "framer-motion";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Reveal from "../Reveal";

const StyledJobsSection = styled.section`
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledTabList = styled.div`
  position: relative;
  z-index: 3;
  width: max-content;
  padding: 0;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    display: flex;
    overflow-x: auto;
    width: calc(100% + 100px);
    padding-left: 50px;
    margin-left: -50px;
    margin-bottom: 30px;
  }
  @media (max-width: 480px) {
    width: calc(100% + 50px);
    padding-left: 25px;
    margin-left: -25px;
  }

  li {
    &:first-of-type {
      @media (max-width: 600px) {
        margin-left: 50px;
      }
      @media (max-width: 480px) {
        margin-left: 25px;
      }
    }
    &:last-of-type {
      @media (max-width: 600px) {
        padding-right: 50px;
      }
      @media (max-width: 480px) {
        padding-right: 25px;
      }
    }
  }
`;

const StyledTabButton = styled.button<{ $isActive: boolean }>`
  ${({ theme }) => theme.mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--tab-height);
  padding: 0 20px 2px;
  border-left: 2px solid var(--lightest-navy);
  background-color: transparent;
  color: ${({ $isActive }) => ($isActive ? "var(--green)" : "var(--slate)")};
  font-family: var(--font-mono);
  font-size: var(--fz-xs);
  text-align: left;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 0 15px 2px;
  }
  @media (max-width: 600px) {
    ${({ theme }) => theme.mixins.flexCenter};
    min-width: 120px;
    padding: 0 15px;
    border-left: 0;
    border-bottom: 2px solid var(--lightest-navy);
    text-align: center;
  }

  &:hover,
  &:focus {
    background-color: var(--light-navy);
  }
`;

const StyledHighlight = styled.div<{ $activeTabId: number }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 2px;
  height: var(--tab-height);
  border-radius: var(--border-radius);
  background: var(--green);
  transform: translateY(
    calc(${({ $activeTabId }) => $activeTabId} * var(--tab-height))
  );
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;

  @media (max-width: 600px) {
    top: auto;
    bottom: 0;
    width: 100%;
    max-width: var(--tab-width);
    height: 2px;
    margin-left: 50px;
    transform: translateX(
      calc(${({ $activeTabId }) => $activeTabId} * var(--tab-width))
    );
  }
  @media (max-width: 480px) {
    margin-left: 25px;
  }
`;

const StyledTabPanels = styled.div`
  position: relative;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 600px) {
    margin-left: 0;
  }
`;

const StyledTabPanel = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 5px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  h3 {
    margin-bottom: 2px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .company {
      color: var(--green);
    }
  }

  .range {
    margin-bottom: 25px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
  }
`;

const Jobs = () => {
  const jobsData = [
    {
      company: "Stdio",
      Content: StdioJob,
      meta: {
        title: "Front-end developer",
        range: "February 2020 - October 2022",
        url: "https://stdiohue.com/",
      },
    },
  ];

  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<null | number>(null);
  const tabs = useRef<HTMLButtonElement[]>([]);

  const selectTab = useCallback(
    (i: number) => () => {
      setActiveTabId(i);
      setTabFocus(i);
    },
    []
  );

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP: {
        e.preventDefault();
        setTabFocus((pre) => (pre || 0) - 1);
        break;
      }

      case KEY_CODES.ARROW_DOWN: {
        e.preventDefault();
        setTabFocus((pre) => (pre || 0) + 1);
        break;
      }

      default: {
        break;
      }
    }
  }, []);

  const focusTab = useCallback(() => {
    if (tabFocus === null) return;

    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    } else if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    } else {
      tabs.current[tabFocus].focus();
    }
  }, [tabs, tabFocus]);

  useEffect(() => {
    focusTab();
  }, [focusTab, tabFocus]);

  return (
    <StyledJobsSection id="jobs">
      <Reveal>
        <h2 className="numbered-heading">Where I’ve Worked</h2>

        <div className="inner">
          <StyledTabList
            role="tablist"
            aria-label="Job tabs"
            onKeyDown={onKeyDown}
          >
            {jobsData.map(({ company }, i) => (
              <StyledTabButton
                key={i}
                $isActive={activeTabId === i}
                onClick={selectTab(i)}
                ref={(el: HTMLButtonElement) => {
                  tabs.current[i] = el;
                }}
                id={`tab-${i}`}
                role="tab"
                tabIndex={activeTabId === i ? 0 : -1}
                aria-selected={activeTabId === i}
                aria-controls={`panel-${i}`}
              >
                <span>{company}</span>
              </StyledTabButton>
            ))}
            <StyledHighlight $activeTabId={activeTabId} />
          </StyledTabList>

          <StyledTabPanels>
            {jobsData.map(({ company, Content, meta }, i) => {
              const { title, url, range } = meta;
              return (
                <motion.div key={i}>
                  <StyledTabPanel
                    id={`panel-${i}`}
                    role="tabpanel"
                    tabIndex={activeTabId === i ? 0 : -1}
                    aria-labelledby={`tab-${i}`}
                    aria-hidden={activeTabId !== i}
                    hidden={activeTabId !== i}
                  >
                    <h3>
                      <span>{title}</span>
                      <span className="company">
                        &nbsp;@&nbsp;
                        <a
                          href={url}
                          className="inline-link"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {company}
                        </a>
                      </span>
                    </h3>

                    <p className="range">{range}</p>

                    <div>
                      <Content />
                    </div>
                  </StyledTabPanel>
                </motion.div>
              );
            })}
          </StyledTabPanels>
        </div>
      </Reveal>
    </StyledJobsSection>
  );
};

export default Jobs;
