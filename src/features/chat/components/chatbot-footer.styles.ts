import styled from "styled-components";

export const ChatbotFooterComponent = styled.div`
  border-top: var(--border-width) solid var(--color-border);
  display: flex;
  min-height: var(--control-height);
  flex-direction: row;

  .chatbot-footer-button {
    font-size: var(--text-label);
    padding: var(--space-2);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;

    &.chatbot-book-button {
      background-color: var(--color-chat-message);
      font-weight: var(--weight-semibold);
    }

    &.chatbot-need-help {
      color: var(--color-text-muted);
    }
  }

  .chatbot-avatar-button {
    width: 3.1var (--chat-width);
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: var(--border-width) solid var(--color-border);
  }
`;
