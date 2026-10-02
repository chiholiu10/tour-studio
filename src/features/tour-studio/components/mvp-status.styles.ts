"use client";

import styled from "styled-components";

export const MvpStatusSurface = styled.details`
  & {
    margin-top: var(--space-6);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-control);
    background: var(--color-surface-status);
  }
  & summary {
    padding: var(--space-3) var(--space-4);
    cursor: pointer;
    font-size: var(--text-label);
  }
  & summary strong {
    margin-left: var(--space-2);
  }
  & summary span {
    margin-left: var(--space-3);
    color: var(--color-text-muted);
  }
  .tour-mvpContent {
    padding: 0 var(--space-4) var(--space-4);
    font-size: var(--text-label);
    color: var(--color-text-muted);
  }
  .tour-mvpContent > p {
    margin: var(--space-3) 0 0;
    line-height: 1.8;
  }
  .tour-mvpTableWrapper {
    overflow-x: auto;
  }
  .tour-mvpTable {
    width: 100%;
    margin-top: var(--space-4);
    text-align: left;
  }
  .tour-mvpTable th,
  .tour-mvpTable td {
    padding: var(--space-3) var(--space-2);
    vertical-align: top;
    border-top: var(--border-width) solid var(--color-border-soft);
  }
  .tour-mvpTable th {
    color: var(--color-text);
    font-weight: 500;
    width: 35%;
  }
  .tour-mvpTable thead th {
    font-weight: 600;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & summary span {
      display: block;
      margin-left: var(--space-5);
      margin-top: var(--space-1);
    }
    .tour-mvpTable th,
    .tour-mvpTable td {
      padding: var(--space-2) var(--space-2);
      font-size: var(--text-label);
    }
  }
`;
