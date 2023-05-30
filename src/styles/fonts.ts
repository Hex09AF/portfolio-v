import localFont from "next/font/local";

const CalibreRegularWoff = "../fonts/Calibre/Calibre-Regular.woff";
const CalibreRegularWoff2 = "../fonts/Calibre/Calibre-Regular.woff2";
const CalibreMediumWoff = "../fonts/Calibre/Calibre-Medium.woff";
const CalibreMediumWoff2 = "../fonts/Calibre/Calibre-Medium.woff2";
const CalibreSemiboldWoff = "../fonts/Calibre/Calibre-Semibold.woff";
const CalibreSemiboldWoff2 = "../fonts/Calibre/Calibre-Semibold.woff2";

const CalibreRegularItalicWoff = "../fonts/Calibre/Calibre-RegularItalic.woff";
const CalibreRegularItalicWoff2 =
  "../fonts/Calibre/Calibre-RegularItalic.woff2";
const CalibreMediumItalicWoff = "../fonts/Calibre/Calibre-MediumItalic.woff";
const CalibreMediumItalicWoff2 = "../fonts/Calibre/Calibre-MediumItalic.woff2";
const CalibreSemiboldItalicWoff =
  "../fonts/Calibre/Calibre-SemiboldItalic.woff";
const CalibreSemiboldItalicWoff2 =
  "../fonts/Calibre/Calibre-SemiboldItalic.woff2";

const SFMonoRegularWoff = "../fonts/SFMono/SFMono-Regular.woff";
const SFMonoRegularWoff2 = "../fonts/SFMono/SFMono-Regular.woff2";
const SFMonoSemiboldWoff = "../fonts/SFMono/SFMono-Semibold.woff";
const SFMonoSemiboldWoff2 = "../fonts/SFMono/SFMono-Semibold.woff2";

const SFMonoRegularItalicWoff = "../fonts/SFMono/SFMono-RegularItalic.woff";
const SFMonoRegularItalicWoff2 = "../fonts/SFMono/SFMono-RegularItalic.woff2";
const SFMonoSemiboldItalicWoff = "../fonts/SFMono/SFMono-SemiboldItalic.woff";
const SFMonoSemiboldItalicWoff2 = "../fonts/SFMono/SFMono-SemiboldItalic.woff2";

const calibreNormalWeights = {
  400: [CalibreRegularWoff, CalibreRegularWoff2],
  500: [CalibreMediumWoff, CalibreMediumWoff2],
  600: [CalibreSemiboldWoff, CalibreSemiboldWoff2],
};

const calibreItalicWeights = {
  400: [CalibreRegularItalicWoff, CalibreRegularItalicWoff2],
  500: [CalibreMediumItalicWoff, CalibreMediumItalicWoff2],
  600: [CalibreSemiboldItalicWoff, CalibreSemiboldItalicWoff2],
};

const sfMonoNormalWeights = {
  400: [SFMonoRegularWoff, SFMonoRegularWoff2],
  600: [SFMonoSemiboldWoff, SFMonoSemiboldWoff2],
};

const sfMonoItalicWeights = {
  400: [SFMonoRegularItalicWoff, SFMonoRegularItalicWoff2],
  600: [SFMonoSemiboldItalicWoff, SFMonoSemiboldItalicWoff2],
};

enum FontStyle {
  normal = "normal",
  italic = "italic",
}

const calibre = {
  name: "Calibre",
  [FontStyle.normal]: calibreNormalWeights,
  [FontStyle.italic]: calibreItalicWeights,
};

const sfMono = {
  name: "SF Mono",
  [FontStyle.normal]: sfMonoNormalWeights,
  [FontStyle.italic]: sfMonoItalicWeights,
};

type CaliberFontType = typeof calibre;
type SfMonoFontType = typeof sfMono;

type LocalFont = CaliberFontType | SfMonoFontType;

const createFontFaces = (
  family: LocalFont,
  style: FontStyle = FontStyle.normal
) => {
  return Object.entries(family[style]).map(([weight, formats]) => {
    const woffPath = formats[0];
    return {
      path: woffPath,
      weight,
      style,
    };
  });
};

const calibreFont = localFont({
  src: [
    {
      path: "../fonts/Calibre/Calibre-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Calibre/Calibre-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Calibre/Calibre-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Calibre/Calibre-RegularItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Calibre/Calibre-MediumItalic.woff",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Calibre/Calibre-SemiboldItalic.woff",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-calibre",
});

const sfMonoFont = localFont({
  src: [
    {
      path: "../fonts/SFMono/SFMono-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SFMono/SFMono-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/SFMono/SFMono-RegularItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/SFMono/SFMono-SemiboldItalic.woff",
      weight: "600",
      style: "italic",
    },
  ],
});

export { calibreFont, sfMonoFont };
