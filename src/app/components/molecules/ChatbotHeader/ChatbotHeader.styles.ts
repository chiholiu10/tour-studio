import theme from "@/app/styles/Theme";
import styled from "styled-components";

export const ChatbotHeaderComponent = styled.div`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.red};
  display: flex;
  flex-direction: row;
  height: 5rem;
  align-items: center;
  justify-content: space-around;

  .chatbot-header-button {
    border-radius: ${theme.borderRadius.xxl};
    background-color: ${theme.colors.white.light};
    width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;

    .button-icon {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;

export const ChatbotHeaderButtonGroup = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-left: auto;
  margin-right: 0;
`;
