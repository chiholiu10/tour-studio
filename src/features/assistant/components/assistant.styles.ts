import styled from "styled-components";

export const AssistantComponent = styled.div`
  border: var(--border-width) solid var(--color-border);
  border-radius: var(--radius-panel);
  width: min(var(--chat-width), 100%);
  background: var(--color-surface);
  max-width: var(--chat-width);
  overflow: hidden;
  position: relative;
`;
