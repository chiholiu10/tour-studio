"use client";

import { ThemeProvider } from "styled-components";
import { CSSreset } from "./styles/CssReset";
import theme from "./styles/Theme";
import { Chatbot } from "./components/organism";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CSSreset />
      <Chatbot />
    </ThemeProvider>
  );
}
