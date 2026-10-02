"use client";

import styled from "styled-components";
import { panelStyles } from "@/shared/styles/primitives";

export const AudioPanelSurface = styled.section`
  ${panelStyles}
  & > .tour-panelHeading {
    padding: var(--space-6);
    border-bottom: var(--border-width) solid var(--color-border);
  }
  .tour-voiceBadge {
    display: flex;
    align-items: center;
    gap: var(--space-1);
    font-size: var(--text-small);
    margin-left: auto;
    color: var(--color-text-muted);
  }
  .tour-voiceBody {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-5) var(--space-6) var(--space-3);
    flex-wrap: wrap;
  }
  .tour-voiceOrb {
    width: 49px;
    height: 49px;
    flex-shrink: 0;
    border-radius: var(--radius-pill);
    background: var(--color-accent-subtle);
    color: var(--color-text-accent);
    display: grid;
    place-items: center;
  }
  .tour-voiceDescription {
    flex: 1;
    min-width: 180px;
  }
  .tour-voiceDescription strong {
    font-size: var(--text-label);
    font-weight: 500;
  }
  .tour-voiceDescription p {
    font-size: var(--text-small);
    color: var(--color-text-muted);
    margin-top: var(--space-1);
  }
  .tour-voiceBody button {
    font-size: var(--text-small);
    padding: var(--space-2) var(--space-3);
  }
  .tour-audioDisclaimer {
    padding: 0 var(--space-6) var(--space-5);
    font-size: var(--text-small);
    line-height: 1.7;
    color: var(--color-text-muted);
  }
  .tour-audioResult {
    padding: var(--space-4) var(--space-6);
    border-top: var(--border-width) solid var(--color-border);
    background: var(--color-surface-selected);
  }
  .tour-audioResult > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-2);
  }
  .tour-audioResult strong {
    font-size: var(--text-label);
    font-weight: 600;
  }
  .tour-audioResult p {
    font-size: var(--text-small);
    margin-bottom: var(--space-2);
  }
  .tour-audioResult audio {
    width: 100%;
    margin-top: var(--space-2);
    height: var(--control-height);
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    .tour-voiceBody {
      gap: var(--space-2);
    }
    .tour-voiceDescription {
      min-width: 140px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & > .tour-panelHeading {
      padding: var(--space-4);
    }
    .tour-voiceBadge {
      width: 100%;
      margin-left: var(--space-9);
    }
    .tour-voiceDescription {
      min-width: 200px;
    }
    .tour-voiceBody button {
      flex: 1;
    }
  }
`;
