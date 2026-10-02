"use client";

import styled from "styled-components";

export const AccessDialogSurface = styled.dialog`
  & {
    border: var(--border-width) solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    border-radius: var(--radius-dialog);
    padding: var(--space-9);
    width: min(var(--dialog-width), calc(100vw - 32px));
    margin: auto;
    font-family: inherit;
    box-shadow: 0 20px 80px var(--color-shadow);
  }
  &::backdrop {
    background: var(--color-backdrop);
  }
  .tour-dialogClose {
    position: absolute;
    right: 12px;
    top: 12px;
    width: var(--control-height);
    height: var(--control-height);
    display: grid;
    place-items: center;
  }
  & h2 {
    font-family: var(--font-editorial);
    font-size: var(--text-heading);
    font-weight: 400;
    line-height: 1.2;
    margin: var(--space-4) 0;
  }
  & p {
    font-size: var(--text-label);
    line-height: 1.7;
    color: var(--color-text-muted);
  }
  & label {
    display: block;
    font-size: var(--text-label);
    margin: var(--space-5) 0 var(--space-2);
  }
  & input {
    width: 100%;
    height: var(--control-height);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-control);
    padding: var(--space-2);
  }
  & small {
    display: block;
    color: var(--color-text-muted);
    font-size: var(--text-small);
    margin-top: var(--space-4);
    line-height: 1.7;
  }
`;
