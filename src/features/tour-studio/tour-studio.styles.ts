"use client";

import styled from "styled-components";
import { buttonStyles } from "@/shared/styles/primitives";

export const TourStudioSurface = styled.div`
  & {
    min-height: 100dvh;
    background: var(--color-canvas);
    color: var(--color-text);
  }
  .tour-topbar {
    min-height: 78px;
    padding: 0 var(--space-10);
    border-bottom: var(--border-width) solid var(--color-border);
    background: var(--color-surface);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-5);
  }
  .tour-brand {
    display: flex;
    gap: var(--space-2);
    align-items: center;
    font-size: var(--text-title);
    font-weight: 700;
    letter-spacing: -1px;
  }
  .tour-brand > span:not(.tour-brandMark) {
    font-weight: 400;
    color: var(--color-text-soft);
  }
  .tour-brandMark {
    background: var(--color-accent-strong);
    color: var(--color-accent);
    width: var(--control-height);
    height: var(--control-height);
    display: grid;
    place-items: center;
    border-radius: var(--radius-dialog);
    margin-right: var(--space-2);
  }
  .tour-topbar nav {
    display: flex;
    align-items: center;
    gap: var(--space-8);
  }
  .tour-topbar nav a {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-height);
    font-size: var(--text-label);
  }
  .tour-topbarLabel {
    font-size: var(--text-small);
    color: var(--color-text-muted);
    letter-spacing: 1.3px;
  }
  .tour-avatar {
    width: 34px;
    height: 34px;
    border-radius: var(--radius-pill);
    background: var(--color-avatar);
    display: grid;
    place-items: center;
    font-size: var(--text-label);
    font-weight: 600;
  }
  .tour-appLayout {
    display: grid;
    grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
    max-width: var(--layout-max);
    margin: auto;
  }
  .tour-sidebar {
    padding: var(--space-10) var(--space-6) var(--space-6);
    border-right: var(--border-width) solid var(--color-border);
    display: flex;
    flex-direction: column;
    min-height: calc(100dvh - 78px);
  }
  .tour-eyebrow {
    display: block;
    font-size: var(--text-small);
    font-weight: 600;
    letter-spacing: 1.7px;
    color: var(--color-text-muted);
  }
  .tour-activeNav,
  .tour-sidebarLink {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-height);
    font-size: var(--text-label);
    padding: var(--space-2) var(--space-3);
    margin-top: var(--space-4);
    border-radius: var(--radius-control);
  }
  .tour-activeNav {
    background: var(--color-nav-active);
    font-weight: 600;
  }
  .tour-activeNav svg:last-child {
    margin-left: auto;
  }
  .tour-sidebarLink {
    margin-top: var(--space-1);
    color: var(--color-text-muted);
  }
  .tour-sidebarLink:hover {
    background: var(--color-nav-active);
    color: var(--color-text);
  }
  .tour-sidebarCollection {
    margin-top: var(--space-18);
  }
  .tour-sidebarCollection h2 {
    font-family: var(--font-editorial);
    font-weight: 400;
    font-size: var(--text-title);
    line-height: 1.25;
    letter-spacing: -0.5px;
    margin: var(--space-5) 0 var(--space-3);
  }
  .tour-sidebarCollection p {
    font-size: var(--text-label);
    line-height: 1.8;
    color: var(--color-text-muted);
  }
  .tour-cityIllustration {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: var(--space-1);
    height: 105px;
    border-bottom: var(--focus-width) solid var(--color-illustration-border);
    padding-top: var(--space-6);
    margin-top: var(--space-4);
  }
  .tour-cityIllustration span {
    width: 27px;
    height: 55px;
    background:
      repeating-linear-gradient(0deg, transparent 0 12px, var(--color-canvas) 12px 15px),
      repeating-linear-gradient(90deg, var(--color-illustration) 0 9px, var(--color-canvas) 9px 13px);
    clip-path: polygon(0 15%, 50% 0, 100% 15%, 100% 100%, 0 100%);
  }
  .tour-cityIllustration span:nth-child(2) {
    height: 73px;
  }
  .tour-cityIllustration span:nth-child(3) {
    height: 84px;
    width: 34px;
  }
  .tour-cityIllustration span:nth-child(4) {
    height: 68px;
  }
  .tour-cityIllustration span:nth-child(5) {
    height: 60px;
  }
  .tour-sidebarFooter {
    margin-top: auto;
    padding-top: var(--space-20);
    font-size: var(--text-small);
  }
  .tour-sidebarFooter p {
    color: var(--color-text-muted);
    line-height: 1.8;
    margin-top: var(--space-3);
  }
  .tour-statusDot {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: var(--color-success);
    border-radius: var(--radius-pill);
    margin-right: var(--space-2);
  }
  .tour-workspace {
    padding: var(--space-10) var(--space-10) var(--space-5);
    min-width: 0;
    height: auto;
  }
  .tour-pageIntro {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-5);
  }
  .tour-pageIntro h1 {
    font-family: var(--font-editorial);
    font-weight: 400;
    font-size: clamp(var(--text-heading), 3.2vw, var(--text-display));
    line-height: 1.2;
    letter-spacing: -1.8px;
    margin: var(--space-3) 0 var(--space-2);
  }
  .tour-pageIntro p {
    font-size: var(--text-label);
    color: var(--color-text-muted);
  }
  .tour-sessionBadge {
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-pill);
    padding: var(--space-2) var(--space-3);
    white-space: nowrap;
    font-size: var(--text-small);
    background: var(--color-surface-subtle);
  }
  .tour-workflow {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-6) 0;
    font-size: var(--text-label);
    color: var(--color-text-muted);
  }
  .tour-workflow span {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  .tour-workflow b {
    font-size: var(--text-small);
    font-weight: 400;
    color: var(--color-text-accent);
  }
  .tour-workflow i {
    height: 1px;
    width: 40px;
    background: var(--color-border-soft);
  }
  .tour-workbench {
    display: grid;
    grid-template-columns: var(--brief-width) minmax(0, 1fr);
    gap: var(--space-6);
    align-items: start;
  }
  .tour-panelHeading {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  .tour-panelHeading h2 {
    font-weight: 600;
    font-size: var(--text-label);
    letter-spacing: -0.2px;
  }
  .tour-panelHeading p {
    font-size: var(--text-small);
    color: var(--color-text-muted);
    margin-top: var(--space-1);
  }
  .tour-step {
    font-family: var(--font-editorial);
    font-size: var(--text-label);
    height: 29px;
    width: 29px;
    background: var(--color-surface-soft);
    border: var(--border-width) solid var(--color-border);
    border-radius: var(--radius-pill);
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .tour-primaryButton,
  .tour-secondaryButton,
  .tour-darkButton {
    ${buttonStyles}
  }
  .tour-primaryButton {
    width: 100%;
    margin-top: var(--space-5);
    background: var(--color-accent);
    color: var(--color-text);
  }
  .tour-primaryButton svg:last-child {
    margin-left: auto;
  }
  .tour-secondaryButton {
    border: var(--border-width) solid var(--color-border);
    background: var(--color-surface);
  }
  .tour-darkButton {
    background: var(--color-accent-strong);
    color: var(--color-surface);
  }
  .tour-outputColumn {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    min-width: 0;
  }
  .tour-iconButton {
    width: var(--control-height);
    height: var(--control-height);
    flex-shrink: 0;
    border-radius: var(--radius-small);
    display: grid;
    place-items: center;
  }
  .tour-iconButton:hover {
    background: var(--color-canvas);
  }
  .tour-textButton {
    min-height: var(--control-height);
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-label);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .tour-workspaceFooter {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-2);
    font-size: var(--text-small);
    color: var(--color-text-muted);
    padding: var(--space-6) 0 0;
  }
  .tour-connectionBar,
  .tour-progress,
  .tour-error {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    border: var(--border-width) solid var(--color-border);
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-control);
    margin-bottom: var(--space-4);
    font-size: var(--text-label);
  }
  .tour-connectionBar {
    background: var(--color-surface-status);
  }
  .tour-progress {
    background: var(--color-surface-status);
  }
  .tour-error {
    background: var(--color-surface-error);
    border-color: var(--color-border-error);
    color: var(--color-text-error);
  }
  .tour-error > div {
    flex: 1;
  }
  .tour-error p {
    margin-top: var(--space-1);
  }
  .tour-srOnly {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }
  .tour-skipLink {
    position: absolute;
    left: 20px;
    top: -100px;
    background: var(--color-surface);
    padding: var(--space-3);
    z-index: 20;
  }
  .tour-skipLink:focus {
    top: 10px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    .tour-workspace {
      padding: var(--space-12) var(--space-15) var(--space-6);
    }
    .tour-workbench {
      grid-template-columns: var(--brief-wide) 1fr;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    .tour-appLayout {
      grid-template-columns: var(--sidebar-compact) minmax(0, 1fr);
    }
    .tour-sidebar {
      padding-left: var(--space-4);
      padding-right: var(--space-4);
    }
    .tour-workspace {
      padding: var(--space-8) var(--space-6) var(--space-5);
    }
    .tour-workbench {
      grid-template-columns: var(--brief-compact) minmax(0, 1fr);
      gap: var(--space-4);
    }
    .tour-sessionBadge {
      display: none;
    }
    .tour-panelHeading p {
      max-width: 180px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    .tour-appLayout {
      grid-template-columns: 1fr;
    }
    .tour-sidebar {
      display: none;
    }
    .tour-workspace {
      padding: var(--space-8) var(--space-6) var(--space-5);
    }
    .tour-topbar {
      padding: 0 var(--space-6);
    }
    .tour-topbarLabel {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    .tour-topbar {
      padding: 0 var(--space-5);
      min-height: 68px;
    }
    .tour-topbar nav {
      gap: var(--space-3);
    }
    .tour-avatar {
      display: none;
    }
    .tour-topbar nav a {
      font-size: var(--text-small);
    }
    .tour-brand {
      font-size: var(--text-title-small);
    }
    .tour-brandMark {
      width: 30px;
      height: 30px;
    }
    .tour-workspace {
      padding: var(--space-7) var(--space-4) var(--space-5);
    }
    .tour-workbench {
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }
    .tour-pageIntro h1 {
      letter-spacing: -1px;
    }
    .tour-pageIntro p {
      font-size: var(--text-label);
      line-height: 1.7;
    }
    .tour-workflow {
      gap: var(--space-2);
      font-size: var(--text-small);
    }
    .tour-workflow i {
      width: 18px;
    }
    .tour-workflow span {
      gap: var(--space-1);
    }
    .tour-panelHeading {
      gap: var(--space-2);
      flex-wrap: wrap;
    }
    .tour-panelHeading p {
      max-width: unset;
    }
    .tour-error,
    .tour-connectionBar {
      flex-wrap: wrap;
    }
    .tour-error .tour-secondaryButton {
      width: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    & button,
    & a {
      transition: none;
    }
  }
`;
