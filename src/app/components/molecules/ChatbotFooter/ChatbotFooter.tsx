import { ChatbotFooterComponent } from "./ChatbotFooter.styles";
import { Button } from "../../atoms";

const ChatbotFooter = () => {
  return (
    <ChatbotFooterComponent>
      <Button className="chatbot-footer-button chatbot-book-button">
        BOOK TICKETS
      </Button>
      <Button className="chatbot-footer-button chatbot-need-help">
        NEED HELP ?
      </Button>
      <Button
        className="chatbot-avatar-button"
        imageSrc="/images/avatar.png"
        imageAlt="avatar-icon"
        imageClassName="avatar-logo"
        width={22}
        height={22}
      />
    </ChatbotFooterComponent>
  );
};

export default ChatbotFooter;
