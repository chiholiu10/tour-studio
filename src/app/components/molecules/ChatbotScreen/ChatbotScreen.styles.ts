import theme from "@/app/styles/Theme";
import styled from "styled-components";

export const ChatbotScreenComponent = styled.div`
  height: 18.75rem;
  overflow-y: auto;
  max-height: 18.75rem;
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.sm};
`;
