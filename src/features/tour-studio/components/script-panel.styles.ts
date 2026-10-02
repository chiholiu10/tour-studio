"use client";

import styled from "styled-components";
import { panelStyles } from "@/shared/styles/primitives";

export const ScriptPanelSurface = styled.section`
  ${panelStyles}
  & > .tour-panelHeading {
    padding: var(--space-6);
    border-bottom: var(--border-width) solid var(--color-border);
  }
  .tour-sourceBadge {
    margin-left: auto;
    font-size: var(--text-small);
    border: var(--border-width) solid var(--color-border);
    background: var(--color-surface-subtle);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-small);
    white-space: nowrap;
  }
  .tour-scriptToolbar {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    justify-content: space-between;
    padding: var(--space-3) var(--space-6) 0;
  }
  .tour-scriptToolbar > span {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-small);
    color: var(--color-text-muted);
  }
  .tour-scriptEditor {
    display: block;
    resize: vertical;
    min-height: 290px;
    width: calc(100% - 48px);
    margin: var(--space-1) var(--space-6) var(--space-4);
    border: 0;
    background: var(--color-surface);
    font-family: var(--font-editorial);
    font-size: var(--text-editor);
    line-height: 1.9;
    color: var(--color-text);
    padding: var(--space-2) 0;
  }
  .tour-scriptEditor:disabled {
    color: var(--color-text);
    opacity: 0.65;
  }
  .tour-scriptMeta {
    display: flex;
    justify-content: space-between;
    gap: var(--space-2);
    flex-wrap: wrap;
    border-top: var(--border-width) solid var(--color-border-soft);
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-small);
    color: var(--color-text-muted);
  }
  .tour-scriptMeta > span {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .tour-draftNote {
    display: flex;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-6);
    background: var(--color-surface-subtle);
    border-top: var(--border-width) solid var(--color-border);
    font-size: var(--text-small);
    line-height: 1.7;
    color: var(--color-text-muted);
  }
  .tour-draftNote svg {
    flex-shrink: 0;
    margin-top: var(--space-1);
  }
  .tour-history {
    padding: var(--space-4) var(--space-6);
    border-top: var(--border-width) solid var(--color-border);
    font-size: var(--text-label);
  }
  .tour-history summary {
    cursor: pointer;
    min-height: 30px;
  }
  .tour-history summary span {
    background: var(--color-accent-subtle);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-small);
    margin-left: var(--space-1);
    font-size: var(--text-small);
  }
  .tour-history > p {
    font-size: var(--text-small);
    margin-bottom: var(--space-2);
    color: var(--color-text-muted);
  }
  .tour-history ul {
    list-style: none;
  }
  .tour-history li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-2);
    border-top: var(--border-width) solid var(--color-border);
    padding: var(--space-2) 0;
  }
  .tour-history small {
    display: block;
    font-size: var(--text-small);
    color: var(--color-text-muted);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    .tour-scriptEditor {
      min-height: 340px;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    .tour-sourceBadge {
      font-size: var(--text-small);
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    .tour-sourceBadge {
      font-size: var(--text-small);
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & > .tour-panelHeading {
      padding: var(--space-4);
    }
    .tour-sourceBadge {
      margin-left: var(--space-9);
    }
    .tour-scriptEditor {
      font-size: var(--text-editor);
      min-height: 310px;
    }
  }
`;
