import Icon from "@/components/icons/icon";
import Portfolio from "@/docs/featured/portfolio/portfolio.mdx";
import Sudoku from "@/docs/featured/sudoku/sudoku.mdx";
import { cubicBezier, motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";
import Reveal from "../Reveal";

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledReveal = styled(motion.li)`
  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }
`;

const StyledProject = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

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
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

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

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    height: 100%;
    grid-area: 1 / 6 / -1 / -1;
    z-index: 1;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      opacity: 0.25;
    }

    a {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      vertical-align: middle;

      &:hover,
      &:focus {
        background: transparent;
        outline: 0;

        &:before,
        .img {
          background: transparent;
          filter: none;
        }
      }

      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 3;
        transition: var(--transition);
        background-color: var(--navy);
        mix-blend-mode: screen;
      }
    }

    .img {
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1) brightness(90%);
      width: 100%;
      max-width: 100%;
      display: flex;

      .cover {
        max-width: 100%;
        height: auto;
      }

      @media (max-width: 768px) {
        width: auto;
        height: 100%;
        filter: grayscale(100%) contrast(1) brightness(50%);
      }
    }
  }
`;

const Featured = () => {
  const featuredProjects = [
    {
      name: "Sudoku",
      Content: Sudoku,
      meta: {
        title: "Competitive Sudoku",
        cover: "/featured/sudoku/sudoku.webp",
        github: "https://github.com/Hex09AF/sudoku",
        external: "https://sudoku-web.onrender.com",
        tech: ["Remix", "XState", "SCSS", "Socket", "Prisma"],
        cta: "",
      },
    },
    {
      name: "Porfolio",
      Content: Portfolio,
      meta: {
        title: "Porfolio v1",
        cover: "/featured/portfolio/portfolio.png",
        github: "https://github.com/Hex09AF/me",
        external: "https://me-hex09af.vercel.app/",
        tech: ["SvelteKit", "Tailwindcss", "Gsap", "Threlte", "Typescript"],
        cta: "",
      },
    },
  ];

  return (
    <section id="projects">
      <Reveal>
        <h2 className="numbered-heading">Some Things I’ve Built</h2>
      </Reveal>

      <StyledProjectsGrid>
        {featuredProjects.map(({ meta, Content }, i) => {
          const { external, title, tech, github, cover, cta } = meta;

          return (
            <StyledReveal
              key={i}
              initial={{ opacity: 0, y: 30, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ amount: 0.25, once: true }}
              transition={{
                duration: 0.5,
                ease: cubicBezier(0.645, 0.045, 0.355, 1),
                delay: 0.2,
              }}
            >
              <StyledProject>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={external}>{title}</a>
                    </h3>

                    <div className="project-description">
                      <Content />
                    </div>

                    {tech.length && (
                      <ul className="project-tech-list">
                        {tech.map((tec, indx) => (
                          <li key={indx}>{tec}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {cta && (
                        <a
                          href={cta}
                          aria-label="Course Link"
                          className="cta"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          Learn More
                        </a>
                      )}
                      {github && (
                        <a
                          href={github}
                          aria-label="GitHub Link"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && !cta && (
                        <a
                          href={external}
                          rel="noopener noreferrer"
                          target="_blank"
                          aria-label="External Link"
                          className="external"
                        >
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-image">
                  <a
                    href={external || github || "#"}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="img">
                      <Image
                        src={cover}
                        alt={title}
                        width={640}
                        height={400}
                        className="cover"
                      />
                    </div>
                  </a>
                </div>
              </StyledProject>
            </StyledReveal>
          );
        })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
