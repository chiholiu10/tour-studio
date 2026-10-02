import { createGlobalStyle } from "styled-components";

export const CSSreset = createGlobalStyle`
  :root {
    ${({ theme }) =>
      Object.entries(theme.tokens)
        .map(([name, value]) => `${name}: ${value};`)
        .join("\n")}
  }
  *, *::before, *::after { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0;
    min-width: 0;
    background: var(--color-canvas);
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: var(--text-body);
    line-height: var(--line-body);
  }
  h1, h2, h3, h4, h5, h6, p, figure, blockquote, ul, ol { margin: 0; }
  h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }
  a { color: inherit; text-decoration: inherit; }
  button, input, select, textarea { font: inherit; color: inherit; }
  button, input, select, textarea { margin: 0; }
  input, select, textarea { font-size: var(--text-body); }
  button {
    border: 0;
    background: transparent;
    text-align: inherit;
    cursor: pointer;
    min-height: var(--control-height);
  }
  button, a {
    transition: background-color var(--motion-fast), color var(--motion-fast);
  }
  button:disabled, fieldset:disabled button { cursor: not-allowed; opacity: var(--disabled-opacity); }
  button:not(:disabled):hover { filter: brightness(0.96); }
  :focus-visible { outline: var(--focus-width) solid var(--color-focus); outline-offset: var(--space-1); }
  fieldset { border: 0; padding: 0; margin: 0; min-width: 0; }
  legend { padding: 0; }
  textarea { resize: vertical; }
  img, svg, video, canvas, audio { display: block; }
  img, video { max-width: 100%; height: auto; }
  table { border-collapse: collapse; }
  [hidden] { display: none !important; }
  @media (prefers-reduced-motion: reduce) {
    button, a { transition: none; }
  }
`;
