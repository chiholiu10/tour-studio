import theme from "../../../styles/Theme";
import styled from "styled-components";

export const ChatbotComponent = styled.div`
  border: 1px solid ${theme.colors.black.lightGrey};
  border-radius: ${theme.borderRadius.md};
  max-width: 25rem;
  overflow: hidden;
  position: relative;
  // z-index: 1001;
`;

export const ChatbotCoverBrowser = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* 100% of the viewport width */
  height: 100vh; /* 100% of the viewport height */
  z-index: 1000; /* Ensures it's on top of other content */
  pointer-events: none; /* Allows clicks to pass through this background */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20px;
  border: 10px solid red;
`;
