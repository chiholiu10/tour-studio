import theme from "../../../styles/Theme";
import styled from "styled-components";

export const MessageBubbleComponent = styled.div`
  background-color: ${theme.colors.white.dark};
  color: ${theme.colors.black.light};
  font-size: ${theme.typoGraphy.fontSizes.md};
  padding: ${theme.spacing.md};
  border-radius: ${theme.typoGraphy.fontSizes.sm};
  margin: ${theme.spacing.sm};
  line-height: ${theme.typoGraphy.lineHeight.lg};
  max-width: 90%;
  display: flex;
  border-bottom-left-radius: 0;
  width: fit-content;

  &.align-end {
    background-color: ${theme.colors.blue};
    color: ${theme.colors.black.main};
    font-weight: ${theme.typoGraphy.fontWeights.semiBold};
    margin-right: ${theme.spacing.sm};
    border-bottom-left-radius: ${theme.typoGraphy.fontSizes.sm};
    border-bottom-right-radius: 0;
    justify-content: flex-end;
    margin-left: auto;
  }
`;
