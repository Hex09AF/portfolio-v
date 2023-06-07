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
  transform-style: preserve-3d;
  perspective: 600px;
  will-change: transform, box-shadow;
  transform-origin: center;

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transform-style: preserve-3d;
    perspective: 600px;
    will-change: transform, box-shadow;
    transform-origin: center;
    display: grid;

    .back,
    .front {
      display: grid;
      grid-area: 1/1;
      border-radius: var(--border-radius);
    }

    .back {
      transform: translate3d(0, 0, -1px);
      background: var(--green);
      backface-visibility: visible;
    }

    .front {
      background: url("/gundam.jpeg") 0% 0% / cover no-repeat;
      backface-visibility: hidden;
    }
  }
  .frame {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);

    border: 2px solid var(--green);
    top: 14px;
    left: 14px;
    z-index: -1;
  }
`;

const About = () => {
  const skills = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "NextJs",
    "Vue",
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
                when I made the decision to try making money by assisting my
                brother with his Upwork project.
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
              <div className="back" />
              <div className="front" />
            </div>
            <div className="frame" />
          </StyledPic>
        </div>
      </Reveal>
    </StyledAboutSection>
  );
};

export default About;
