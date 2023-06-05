"use client";

import Icon from "@/components/icons/icon";
import { cubicBezier, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Reveal from "../Reveal";

const StyledProjectsSection = styled.section`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 0;
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 25px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  > div {
    height: 100%;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: "";
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

const Projects = () => {
  const [showMore, setShowMore] = useState(false);

  const GRID_LIMIT = 3;
  const projects = [
    {
      content:
        "I write about some small subject in my React career (Git, lint, format, best practice, React, ..)",
      meta: {
        title: "Note for new React learner",
        github: "",
        external:
          "https://flossy-cellar-3af.notion.site/React-Roadmap-db7c7df7ffdd459798b1c0c60dfefe3c",
        tech: ["React", "Blog", "Note"],
      },
    },
    {
      content:
        "A ordering food platform for business, an event, or even a regular meal that accepts payments online and tracks orders.",
      meta: {
        title: "Pito",
        github: "",
        external: "https://app.pito.vn/",
        tech: ["React", "NextJs", "GatsbyJs"],
      },
    },
    {
      content:
        "Learning app that help employee improve self-learning by joining course which can be recorded by the teacher.",
      meta: {
        title: "Elearning",
        github: "",
        external: "https://www.growthcollege.jp/",
        tech: ["React", "React router", "Redux"],
      },
    },
    {
      content:
        "An app that will allow users to create, share and watch 👀 lists of YouTube channels. (Forked from CodingGarden)",
      meta: {
        title: "Listd",
        github: "https://github.com/Hex09AF/fullstack-learn",
        external: "https://github.com/Hex09AF/fullstack-learn",
        tech: ["Svelte", "SvelteKit", "Vite"],
      },
    },
  ];
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const projectInner = (
    meta: {
      github: string;
      title: string;
      external: string;
      tech: string[];
    },
    content: string
  ) => {
    const { github, external, title, tech } = meta;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
            <div className="project-links">
              {github && (
                <a
                  href={github}
                  aria-label="GitHub Link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  className="external"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">
            <a href={external} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>

          <div className="project-description">{content}</div>
        </header>

        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((tec, i) => (
                <li key={i}>{tec}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <Reveal>
        <h3>Other Noteworthy Projects</h3>
      </Reveal>

      <ul className="projects-grid">
        {projectsToShow &&
          projectsToShow.map(({ content, meta }, i) => (
            <StyledProject key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.25, once: true }}
                transition={{
                  duration: 0.5,
                  ease: cubicBezier(0.645, 0.045, 0.355, 1),
                  delay:
                    i >= GRID_LIMIT
                      ? ((i - GRID_LIMIT) % 4) * 0.2
                      : ((i + 1) % 4) * 0.2,
                }}
              >
                {projectInner(meta, content)}
              </motion.div>
            </StyledProject>
          ))}
      </ul>

      <button
        type="button"
        className="more-button"
        onClick={() => setShowMore(!showMore)}
      >
        Show {showMore ? "Less" : "More"}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;
