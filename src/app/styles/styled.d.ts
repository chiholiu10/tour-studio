import "styled-components";

type HEX = `#${string}`;
type Color = HEX;

type ColorVariant = {
  light: Color;
  main: Color;
  dark: Color;
};

type Colors = {
  white: ColorVariant & {
    // Additional shades for white
    lightGrey?: Color;
    lightExtra?: Color;
    extraDark?: Color;
    ultraLightDark?: Color;
  };
  black: ColorVariant & {
    // Additional shades for black
    lightGrey?: Color;
    lightExtra?: Color;
    extraDark?: Color;
    ultraLightDark?: Color;
  };
  blue: Color;
  red: Color;
};

type TypoGraphy = {
  fontWeights: {
    regular?: string | number;
    normal?: string | number;
    semiBold?: string | number;
    bold?: string | number;
    extraBold?: string | number;
    black?: string | number;
  };
  fonts: {
    heading: string;
    body: string;
  };
  fontSizes: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  lineHeight: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};

type Spacing = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

type BorderRadius = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: Colors;
    typoGraphy: TypoGraphy;
    spacing: Spacing;
    borderRadius: BorderRadius;
  }
}
