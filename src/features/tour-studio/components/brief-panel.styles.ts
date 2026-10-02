"use client";

import styled from "styled-components";
import { panelStyles } from "@/shared/styles/primitives";

export const BriefPanelSurface = styled.section`
  ${panelStyles}
  & {
    padding: var(--space-6);
  }
  .tour-fieldset {
    border: 0;
    min-width: 0;
    padding: 0;
  }
  .tour-label {
    display: block;
    font-size: var(--text-label);
    font-weight: 600;
    margin: var(--space-6) 0 var(--space-2);
    padding: 0;
  }
  .tour-label span {
    font-weight: 400;
    font-size: var(--text-small);
    color: var(--color-text-muted);
    margin-left: var(--space-1);
  }
  .tour-locationList {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .tour-locationCard {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-2);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-control);
    cursor: pointer;
    min-height: 61px;
  }
  .tour-locationCard:hover {
    border-color: var(--color-border-hover);
  }
  .tour-locationCard input {
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
  }
  .tour-locationCard:has(input:focus-visible) {
    outline: var(--focus-width) solid var(--color-focus);
    outline-offset: 3px;
  }
  .tour-locationCard strong {
    display: block;
    font-weight: 600;
    font-size: var(--text-label);
  }
  .tour-locationCard small {
    display: block;
    color: var(--color-text-muted);
    font-size: var(--text-small);
    margin-top: var(--space-1);
  }
  .tour-locationNumber {
    width: 28px;
    height: 32px;
    background: var(--color-surface-soft);
    border-radius: var(--radius-small);
    display: grid;
    place-items: center;
    color: var(--color-text-accent);
    font-family: var(--font-editorial);
  }
  .tour-selected {
    border-color: var(--color-border-selected);
    background: var(--color-surface-selected);
  }
  .tour-radioMark {
    margin-left: auto;
    width: 15px;
    height: 15px;
    border: var(--border-width) solid var(--color-border-hover);
    border-radius: var(--radius-pill);
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .tour-selected .tour-radioMark {
    background: var(--color-accent-strong);
    border-color: var(--color-accent-strong);
    color: var(--color-surface);
  }
  .tour-fieldset select {
    width: 100%;
    height: var(--control-height);
    padding: 0 var(--space-2);
    background: var(--color-surface);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-control);
    font-size: var(--text-body);
  }
  .tour-segmented {
    display: flex;
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-control);
    padding: var(--space-1);
    gap: var(--space-1);
  }
  .tour-segmented button {
    flex: 1;
    min-height: var(--control-height);
    border-radius: var(--radius-small);
    font-size: var(--text-label);
    color: var(--color-text-muted);
    text-align: center;
  }
  .tour-segmented .tour-activeSegment {
    background: var(--color-accent-subtle);
    color: var(--color-text);
    font-weight: 600;
  }
  .tour-direction {
    resize: vertical;
    min-height: 100px;
    width: 100%;
    padding: var(--space-3);
    border-radius: var(--radius-control);
    border: var(--border-width) solid var(--color-border);
    font-size: var(--text-body);
    line-height: 1.7;
    background: var(--color-surface);
  }
  .tour-direction::placeholder {
    color: var(--color-text-muted);
  }
  .tour-hint {
    font-size: var(--text-small);
    color: var(--color-text-muted);
    line-height: 1.7;
    margin-top: var(--space-2);
  }
  .tour-editorialNote {
    border-top: var(--border-width) solid var(--color-border);
    padding-top: var(--space-5);
    margin-top: var(--space-6);
  }
  .tour-editorialNote .tour-eyebrow {
    font-size: var(--text-small);
  }
  .tour-editorialNote p {
    font-family: var(--font-editorial);
    font-size: var(--text-title-small);
    line-height: 1.4;
    margin: var(--space-3) 0 var(--space-2);
  }
  .tour-editorialNote > span:last-child {
    font-size: var(--text-small);
    color: var(--color-text-muted);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & {
      padding: var(--space-5);
    }
    .tour-editorialNote {
      display: none;
    }
  }
`;
