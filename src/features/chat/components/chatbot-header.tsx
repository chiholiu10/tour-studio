import React from "react";
import { ChatbotHeaderButtonGroup, ChatbotHeaderComponent } from "./chatbot-header.styles";
import Image from "next/image";
import Button from "../../../shared/components/button";

const ChatbotHeader: React.FC = () => (
  <ChatbotHeaderComponent className="handle">
    <Image
      className="chatbot-logo"
      src="/images/tour-and-tickets-logo.png"
      alt="Tours and Tickets"
      width={176}
      height={26}
    />
    <ChatbotHeaderButtonGroup>
      <Button
        disabled
        title="Unavailable in this demo"
        className="chatbot-header-button"
        imageSrc="/images/cart.png"
        imageAlt="cart-icon"
        imageClassName="cart-icon"
        width={22}
        height={22}
      />
      <Button
        disabled
        title="Unavailable in this demo"
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
