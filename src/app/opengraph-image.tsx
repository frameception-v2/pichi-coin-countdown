import { ImageResponse } from "next/og";
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";
import fs from "fs";

export const alt = PROJECT_TITLE;

export const contentType = "image/png";

const loadFont = async (filename: string) => {
  const font = await fs.promises.readFile(`public/fonts/${filename}`);
  return font;
};

const fontRegular = await loadFont("Nunito-Regular.ttf");
const fontSemiBold = await loadFont("Nunito-SemiBold.ttf");

const options = {
  width: 1200,
  height: 800,
  fonts: [
    {
      name: "Nunito",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "Nunito",
      data: fontSemiBold,
      weight: 600,
      style: "normal",
    },
  ],
};

const BACKGROUND_GRADIENT_START = "#3b82f6";
const BACKGROUND_GRADIENT_END = "#1d4ed8";
const BACKGROUND_GRADIENT_STYLE = {
  backgroundImage: `linear-gradient(to bottom, ${BACKGROUND_GRADIENT_START}, ${BACKGROUND_GRADIENT_END})`,
  color: "white",
};
/*
this Image is rendered using vercel/satori.

Satori supports a limited subset of HTML and CSS features, due to its special use cases. In general, only these static and visible elements and properties that are implemented.
For example, the <input> HTML element, the cursor CSS property are not in consideration. And you can't use <style> tags or external resources via <link> or <script>.
Also, Satori does not guarantee that the SVG will 100% match the browser-rendered HTML output since Satori implements its own layout engine based on the SVG 1.1 spec.
Please refer to Satori’s documentation for a list of supported HTML and CSS features. https://github.com/vercel/satori#css
*/
export default async function Image() {
  return new ImageResponse(
    (
      <div
        tw="h-full w-full flex flex-col justify-center items-center relative"
        style={BACKGROUND_GRADIENT_STYLE}
      >
        <h1 tw="text-8xl text-center font-semibold mb-8">{PROJECT_TITLE}</h1>
        <h3 tw="text-3xl font-normal max-w-2xl text-center leading-tight">
          {PROJECT_DESCRIPTION}
        </h3>
      </div>
    ),
    // @ts-expect-error - ignore weight as number type mismatch
    options
  );
}
