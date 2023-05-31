import StyledComponentsRegistry from "@/lib/registry";
import { Metadata } from "next";

const title = "Le Sy Quoc Huy";
const siteName = title;
const description =
  "Le Sy Quoc Huy is a software developer specializing in building exceptional digital experiences, passionate about making websites that have best performance, secure and friendly with other developer.";

export const metadata: Metadata = {
  title,
  applicationName: "Le Sy Quoc Huy",
  description,
  keywords: ["Le Sy Quoc Huy", "CV", "Portfolio", "@HQuoosc", "Hex09AF"],
  authors: [{ name: "Le Sy Quoc Huy", url: "https://github.com/Hex09AF" }],
  colorScheme: "dark",
  creator: "Le Sy Quoc Huy",
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@HQuoosc",
    creatorId: "1430487821605687303",
  },
  openGraph: {
    title,
    description,
    siteName,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
