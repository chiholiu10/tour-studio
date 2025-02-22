import { DefaultTheme } from "styled-components";
import token from "./token";

const theme: DefaultTheme = {
  colors: token.colors,
  typoGraphy: {
    fontWeights: token.typoGraphy.fontWeights,
    fonts: token.typoGraphy.fonts,
    fontSizes: token.typoGraphy.fontSizes,
    lineHeight: token.typoGraphy.lineHeight,
  },
  borderRadius: token.borderRadius,
  spacing: token.spacing,
};

export default theme;
