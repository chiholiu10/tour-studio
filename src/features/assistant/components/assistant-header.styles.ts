import styled from "styled-components";

export const AssistantHeaderComponent = styled.div`
  padding: var(--space-4);
  background-color: var(--color-chat-brand);
  display: flex;
  flex-direction: row;
  height: 5rem;
  align-items: center;
  justify-content: space-around;

  .assistant-header-button {
    border-radius: var(--radius-pill);
    background-color: var(--color-chat-brand-overlay);
    width: var(--control-height);
    height: var(--control-height);
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

export const AssistantHeaderButtonGroup = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-left: auto;
  margin-right: 0;
`;
