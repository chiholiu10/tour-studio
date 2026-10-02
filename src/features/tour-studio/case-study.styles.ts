"use client";

import styled from "styled-components";

export const CaseStudySurface = styled.main`
  & {
    max-width: var(--case-width);
    margin: auto;
    padding: var(--space-18) var(--space-9);
    height: auto;
  }
  & h1 {
    font-family: var(--font-editorial);
    font-size: clamp(var(--text-heading), 6vw, var(--text-hero));
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: -2px;
    margin: var(--space-4) 0 var(--space-6);
    max-width: var(--reading-width);
  }
  .tour-caseLead {
    font-size: var(--text-body);
    max-width: var(--reading-width);
    color: var(--color-text-muted);
    line-height: 1.8;
  }
  .tour-caseTags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: var(--space-7) 0 var(--space-12);
  }
  .tour-caseTags span {
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-pill);
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-label);
  }
  .tour-caseSection {
    border-top: var(--border-width) solid var(--color-border);
    padding: var(--space-7) 0;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: var(--space-8);
  }
  .tour-caseSection h2 {
    font-size: var(--text-label);
    font-weight: 600;
  }
  .tour-caseSection p,
  .tour-caseSection li {
    color: var(--color-text-muted);
    font-size: var(--text-label);
    line-height: 1.8;
  }
  .tour-caseSection p + p {
    margin-top: var(--space-4);
  }
  .tour-caseSection ul {
    padding-left: var(--space-4);
  }
  .tour-caseSection a {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .tour-caseSection blockquote {
    font-family: var(--font-editorial);
    font-size: var(--text-title-small);
    line-height: 1.6;
  }
  .tour-caseDiagram {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-label);
    margin: var(--space-4) 0;
  }
  .tour-caseDiagram span {
    border: var(--border-width) solid var(--color-border);
    background: var(--color-surface);
    padding: var(--space-3);
    border-radius: var(--radius-control);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & {
      padding: var(--space-10) var(--space-6);
    }
    .tour-caseSection {
      grid-template-columns: 1fr;
      gap: var(--space-3);
    }
  }
`;
