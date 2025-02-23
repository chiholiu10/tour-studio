import theme from "../../../styles/Theme";
import styled from "styled-components";

export const ChatbotComponent = styled.div`
  border: 1px solid ${theme.colors.black.lightGrey};
  border-radius: ${theme.borderRadius.md};
  max-width: 25rem;
  overflow: hidden;
  position: relative;
`;
