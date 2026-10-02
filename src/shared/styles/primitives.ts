import { css } from "styled-components";

export const panelStyles = css`
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-panel);
  background: var(--color-surface);
  overflow: hidden;
`;

export const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--control-height);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-label);
  font-weight: var(--weight-semibold);
  border-radius: var(--radius-control);
`;
