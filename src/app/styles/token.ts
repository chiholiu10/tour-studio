import { DefaultTheme } from "styled-components";

const token: DefaultTheme = {
  colors: {
    white: {
      light: "#FFFFFF2E", // white with 18% opacity
      main: "#FFFFFF",
      dark: "#F1F1F1",
    },
    black: {
      transparentBlack: "#00000026", // Dark with 15% opacity
      lightGrey: "#E5E5E5",
      ultraLight: "#636363",
      lightMedium: "#5A5A5A",
      light: "#373737",
      darkerLight: "#313131",
      main: "#000000",
      dark: "#030303",
    },
    blue: "#55D0FF",
    red: "#FF3333",
  },
  typoGraphy: {
    fontWeights: {
      regular: 300,
      normal: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
    fontSizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      md: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
    },
    fonts: {
      heading: "'Urbanist', sans-serif",
      body: "'Urbanist', sans-serif",
    },
    lineHeight: {
      xs: "1rem", // 16px
      sm: "1.063rem", // 17px
      md: "1.125rem", // 18px
      lg: "1.2rem", // 19.2px
      xl: "1.25rem", // 20px
    },
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
  },
  borderRadius: {
    xs: "0.375rem", // 6px,
    sm: "0.5rem", // 8px
    md: "0.625rem", // 10px
    lg: "0.75", // 12px
    xl: "0.875", // 14px
    xxl: "16rem", // 50%
  },
};

export default token;
