import { AssistantFooterComponent } from "./assistant-footer.styles";
import Button from "../../../shared/components/button";

const AssistantFooter = () => {
  return (
    <AssistantFooterComponent>
      <Button disabled title="Unavailable in this demo" className="assistant-footer-button assistant-book-button">
        BOOK TICKETS
      </Button>
      <Button disabled title="Unavailable in this demo" className="assistant-footer-button assistant-need-help">
        NEED HELP ?
      </Button>
      <Button
        disabled
        title="Unavailable in this demo"
        className="assistant-avatar-button"
        imageSrc="/images/avatar.png"
        imageAlt="avatar-icon"
        imageClassName="avatar-logo"
        width={22}
        height={22}
      />
    </AssistantFooterComponent>
  );
};

export default AssistantFooter;
