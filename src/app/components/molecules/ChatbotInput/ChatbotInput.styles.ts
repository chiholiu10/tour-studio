import theme from "@/app/styles/Theme";
import styled from "styled-components";

export const ChatbotInputComponent = styled.div`
  display: flex;
  padding: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.black.lightGrey};

  .chatbot-input-field {
    border: none;
    flex: 1;
    padding: ${theme.spacing.sm};
    font-size: ${theme.typoGraphy.fontSizes.sm};

    &::placeholder {
      color: ${theme.colors.black.ultraLight};
    }

    &:focus {
      outline: none;
    }
  }

  .send-icon {
    width: 2rem;
    height: 2rem;
    background-color: ${theme.colors.red};
    border-radius: ${theme.borderRadius.xxl};
    display: flex;
    justify-content: center;
    align-items: center;
    &[disabled] {
      background-color: ${theme.colors.black.transparentBlack};
    }
  }
`;
