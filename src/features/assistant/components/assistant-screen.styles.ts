import styled from "styled-components";

export const AssistantScreenComponent = styled.div`
  height: var(--chat-history-height);
  overflow-y: auto;
  max-height: var(--chat-history-height);
  display: flex;
  flex-direction: column;
  padding: var(--space-2);
`;
