import theme from "@/app/styles/Theme";
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
  margin: auto 0 1.25rem;
  justify-content: ${(props) =>
    props.$userType === "user" ? "flex-start" : "flex-end"};
`;

export const Bubble = styled.div`
  width: 0.438rem;
  height: 0.438rem;
  margin: 0 0.3rem;
  border-radius: ${theme.borderRadius.xxl};
  background-color: ${theme.colors.black.darkerLight};
  animation: ${typingAnimation} 0.8s infinite alternate;

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
