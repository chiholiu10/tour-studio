import React from "react";
import {
  ChatbotHeaderButtonGroup,
  ChatbotHeaderComponent,
} from "./ChatbotHeader.styles";
import Logo from "../../atoms/Logo/Logo";
import Button from "../../atoms/Button/Button";

const ChatbotHeader: React.FC = () => (
  <ChatbotHeaderComponent>
    <Logo
      className="chatbot-logo"
      imageSrc="/images/tour-and-tickets-logo.png"
      imageAlt="chatbot-logo"
      width={176}
      height={26}
    />
    <ChatbotHeaderButtonGroup>
      <Button
        className="chatbot-header-button"
        imageSrc="/images/cart.png"
        imageAlt="cart-icon"
        imageClassName="cart-icon"
        width={22}
        height={22}
      />
      <Button
        className="chatbot-header-button"
        imageSrc="/images/close.png"
        imageAlt="close-icon"
        imageClassName="close-icon"
        width={13}
        height={13}
      />
    </ChatbotHeaderButtonGroup>
  </ChatbotHeaderComponent>
);

export default ChatbotHeader;
