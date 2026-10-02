import styled from "styled-components";

export const ChatbotInputComponent = styled.div`
  display: flex;
  padding: var(--space-2);
  border-top: var(--border-width) solid var(--color-border);

  .chatbot-input-field {
    border: none;
    flex: 1;
    min-width: 0;
    padding: var(--space-2);
    font-size: var(--text-body);

    &::placeholder {
      color: var(--color-text-muted);
    }

    &:focus {
      outline: var(--focus-width) solid var(--color-chat-brand);
      outline-offset: -2px;
    }
  }

  .send-icon {
    width: var(--control-height);
    height: var(--control-height);
    background-color: var(--color-chat-brand);
    border-radius: var(--radius-pill);
    display: flex;
    justify-content: center;
    align-items: center;
    &[disabled] {
      background-color: var(--color-disabled);
    }
  }
`;
