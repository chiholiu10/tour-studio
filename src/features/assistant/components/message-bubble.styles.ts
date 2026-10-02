import styled from "styled-components";

export const MessageBubbleComponent = styled.div`
  background-color: var(--color-chat-message);
  color: var(--color-text);
  font-size: var(--text-body);
  padding: var(--space-4);
  border-radius: var(--text-label);
  margin: var(--space-2);
  line-height: var(--line-body);
  max-width: 90%;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  display: flex;
  border-bottom-left-radius: 0;
  width: fit-content;

  &.align-end {
    background-color: var(--color-chat-user);
    color: var(--color-text);
    margin-right: var(--space-2);
    border-bottom-left-radius: var(--text-label);
    border-bottom-right-radius: 0;
    justify-content: flex-end;
    margin-left: auto;
  }
`;
