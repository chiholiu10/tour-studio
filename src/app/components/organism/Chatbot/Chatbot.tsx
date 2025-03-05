import React, { useRef, useEffect, useState } from "react";
import { MessageBubbleProps } from "../../atoms/MessageBubble/Message.types";
import { ChatbotComponent } from "./Chatbot.styles";
import {
  ChatbotFooter,
  ChatbotHeader,
  ChatbotInput,
  ChatbotScreen,
} from "../../molecules";
import Loader from "../../atoms/Loader/Loader";
import { sanitizeInput } from "../../../utils";
import { usePageLoad, useScrollToBottom } from "../../../hooks";
import Draggable, {
  DraggableData,
  DraggableEventHandler,
} from "react-draggable";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<MessageBubbleProps[]>([]);
  const [input, setInput] = useState<string>("");
  const [botResponses, setBotResponses] = useState<string[]>([]);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [isUserTyping, setIsUserTyping] = useState<boolean>(false);
  const scollToBottomRef = useScrollToBottom(messages, input);
  const pageLoad = usePageLoad();
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleDrag: DraggableEventHandler = (e, data: DraggableData) => {
    // Update the position of the component while dragging
    setPosition({ x: data.x, y: data.y });
  };

  const quantity = 10;
  const locale = "en_US";

  const fetchBotMessages = async (signal: AbortSignal) => {
    try {
      const response = await fetch(
        `https://fakerapi.it/api/v2/custom?_quantity=${quantity}&_locale=${locale}&message=text`,
        { signal },
      );
      const data = await response.json();

      if (data && data.data.length > 0) {
        const messagesArray = data.data.map((item: { message: string }) =>
          sanitizeInput(item.message),
        );
        setBotResponses(messagesArray);
      }
    } catch (error) {
      console.error("Error fetching bot messages:", error);
      setBotResponses(["Sorry, I couldn't fetch responses."]);
      setIsBotTyping(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    // Call fetchBotMessages with the AbortSignal
    fetchBotMessages(signal);

    return () => {
      abortController.abort();
    };
  }, []);

  const getRandomBotReply = (): string => {
    if (botResponses.length === 0) return "I'm still thinking...";

    const randomIndex = Math.floor(Math.random() * botResponses.length);
    return botResponses[randomIndex];
  };

  const handleInputChange = (value: string) => {
    const getValue = value;
    const sanitizedValue = sanitizeInput(getValue);
    setInput(sanitizedValue);

    if (sanitizedValue.length > 0) {
      setIsUserTyping(true);
    } else if (sanitizedValue.length === 0) {
      setIsUserTyping(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    setInput("");
    setIsUserTyping(false);

    setIsBotTyping(true);
    const botReplyText = getRandomBotReply();

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: botReplyText },
      ]);
      setIsBotTyping(false);
    }, 1200);
  };

  const nodeRef = useRef(null); // Create a ref for the draggable element

  return (
    <>
      {!pageLoad ? (
        <Loader />
      ) : (
        <Draggable
          nodeRef={nodeRef}
          axis="both" // Allow dragging in both x and y directions
          handle=".handle" // Make the widget draggable only when clicked on the handle (optional)
          position={position}
          onDrag={handleDrag}
          bounds="parent" // This ensures that the component stays inside its parent element (the browser window)
        >
          <ChatbotComponent ref={nodeRef}>
            <ChatbotHeader />

            <ChatbotScreen
              messages={messages}
              isUserTyping={isUserTyping}
              isBotTyping={isBotTyping}
              scollToBottomRef={scollToBottomRef}
            />

            <ChatbotInput
              input={input}
              handleInputChange={handleInputChange}
              handleSendMessage={handleSendMessage}
              isUserTyping={isUserTyping}
            />
            <ChatbotFooter />
          </ChatbotComponent>
        </Draggable>
      )}
    </>
  );
};

export default ChatBot;
