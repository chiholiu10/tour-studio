import React from "react";
import { AssistantHeaderButtonGroup, AssistantHeaderComponent } from "./assistant-header.styles";
import Image from "next/image";
import Button from "../../../shared/components/button";

const AssistantHeader: React.FC = () => (
  <AssistantHeaderComponent className="handle">
    <Image
      className="assistant-logo"
      src="/images/tour-and-tickets-logo.png"
      alt="Tours and Tickets"
      width={176}
      height={26}
    />
    <AssistantHeaderButtonGroup>
      <Button
        disabled
        title="Unavailable in this demo"
        className="assistant-header-button"
        imageSrc="/images/cart.png"
        imageAlt="cart-icon"
        imageClassName="cart-icon"
        width={22}
        height={22}
      />
      <Button
        disabled
        title="Unavailable in this demo"
        className="assistant-header-button"
        imageSrc="/images/close.png"
        imageAlt="close-icon"
        imageClassName="close-icon"
        width={13}
        height={13}
      />
    </AssistantHeaderButtonGroup>
  </AssistantHeaderComponent>
);

export default AssistantHeader;
