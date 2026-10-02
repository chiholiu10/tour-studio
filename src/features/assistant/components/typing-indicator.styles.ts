import styled, { keyframes } from "styled-components";

const typingAnimation = keyframes`
  0% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
`;

export const TypingIndicatorComponent = styled.div<{ $userType: string }>`
  display: flex;
  align-items: center;
  margin: auto 0 1var (--chat-width);
  justify-content: ${(props) => (props.$userType === "user" ? "flex-end" : "flex-start")};
`;

export const Bubble = styled.div`
  width: 0.438rem;
  height: 0.438rem;
  margin: 0 0.3rem;
  border-radius: var(--radius-pill);
  background-color: var(--color-text);
  animation: ${typingAnimation} var(--motion-typing) infinite alternate;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  &:nth-of-type(1) {
    animation-delay: 0.2s;
  }
  &:nth-of-type(2) {
    animation-delay: 0.4s;
  }
  &:nth-of-type(3) {
    animation-delay: 0.6s;
  }
`;
