import { ChatbotFooterComponent } from "./chatbot-footer.styles";
import Button from "../../../shared/components/button";

const ChatbotFooter = () => {
  return (
    <ChatbotFooterComponent>
      <Button disabled title="Unavailable in this demo" className="chatbot-footer-button chatbot-book-button">
        BOOK TICKETS
      </Button>
      <Button disabled title="Unavailable in this demo" className="chatbot-footer-button chatbot-need-help">
        NEED HELP ?
      </Button>
      <Button
        disabled
        title="Unavailable in this demo"
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
