import { DefaultTheme } from "styled-components";

const token: DefaultTheme = {
  colors: {
    // colors contains light - main - dark (if there are color variants)
    white: {
      light: "#FFFFFF2E", // white with 18% opacity
      main: "#FFFFFF",
      dark: "#F1F1F1",
    },
    black: {
      light: "#373737",
      main: "#000000",
      dark: "#313131",

      // additional shades
      lightGrey: "#E5E5E5",
      lightExtra: "#5A5A5A",
      extraDark: "#030303",
      ultraLightDark: "#00000026", // dark with 15% opacity
    },
    blue: "#55D0FF",
    red: "#FF3333",
  },
  typoGraphy: {
    fontWeights: {
      regular: 300,
      normal: 400,
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
    xs: "0.125rem", // 2px,
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "1rem", // 16px
    xl: "1.5rem", // 24px
    xxl: "16rem", // 50%
  },
};

export default token;
