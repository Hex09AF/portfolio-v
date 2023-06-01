"use client";

import styled from "styled-components";
import Reveal from "../Reveal";

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const skills = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "NextJs",
    "Vue 3",
    "Nuxt",
    "Node",
    "Express",
  ];

  return (
    <StyledAboutSection id="about">
      <Reveal>
        <h2 className="numbered-heading">About Me</h2>

        <div className="inner">
          <StyledText>
            <div>
              <p>
                Hello! My name is Huy, I enjoy creating things that live on the
                internet. My interest in web development started back in 2016
                when I decided to try earning money by helping my brother in his
                upwork job.
              </p>

              <p>
                Fast-forward to today, and I’ve had the privilege of learning at
                <a
                  href="https://husc.edu.vn/en/news.php"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  University of Sciences - Hue University
                </a>
                , working at{" "}
                <a
                  href="https://stdiohue.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  a start up
                </a>
                teach me a lot, a lot of things. My main focus these days is
                untangling my skills by learning more languages, and never stop
                learning to become a good developer.
              </p>

              <p>
                Here are a few technologies I’ve been working with recently:
              </p>
            </div>

            <ul className="skills-list">
              {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </StyledText>

          <StyledPic>
            <div className="wrapper">
              {/* <Image
              className="img"
              src="/../images/me.jpg"
              width={500}
              height={500}
              quality={95}
              alt="Headshot"
            /> */}
            </div>
          </StyledPic>
        </div>
      </Reveal>
    </StyledAboutSection>
  );
};

export default About;
