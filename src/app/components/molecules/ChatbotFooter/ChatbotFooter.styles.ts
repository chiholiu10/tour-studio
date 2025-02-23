import theme from "@/app/styles/Theme";
import styled from "styled-components";

export const ChatbotFooterComponent = styled.div`
  border-top: 1px solid ${theme.colors.black.lightGrey};
  display: flex;
  height: 2.625rem;
  flex-direction: row;

  .chatbot-footer-button {
    font-size: ${theme.typoGraphy.fontSizes.sm};
    padding: ${theme.spacing.sm};
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;

    &.chatbot-book-button {
      background-color: ${theme.colors.white.dark};
      font-weight: ${theme.typoGraphy.fontWeights.semiBold};
    }

    &.chatbot-need-help {
      color: ${theme.colors.black.ultraLight};
    }
  }

  .chatbot-avatar-button {
    width: 3.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${theme.colors.black.lightGrey};
  }
`;
