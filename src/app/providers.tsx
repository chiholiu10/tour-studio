"use client";

import { ReactNode, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";
import theme from "../shared/styles/theme";
import { CSSreset } from "../shared/styles/css-reset";

export default function Providers({ children }: { children: ReactNode }) {
  const [sheet] = useState(() => new ServerStyleSheet());
  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });
  const content = (
    <ThemeProvider theme={theme}>
      <CSSreset />
      {children}
    </ThemeProvider>
  );
  return typeof window === "undefined" ? (
    <StyleSheetManager sheet={sheet.instance}>{content}</StyleSheetManager>
  ) : (
    content
  );
}
