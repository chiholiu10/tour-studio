import { AccessDialogSurface } from "./access-dialog.styles";
import { useEffect, useRef, useState } from "react";
import Icon from "./icon";

interface AccessDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (token: string) => void;
}

export default function AccessDialog({ open, onClose, onSave }: AccessDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (open) {
      setValue("");
      dialog.current?.showModal();
    } else dialog.current?.close();
  }, [open]);
  return (
    <AccessDialogSurface
      ref={dialog}
      className="tour-dialog"
      aria-labelledby="access-title"
      onCancel={onClose}
      onClose={onClose}
    >
      <button className="tour-dialogClose" type="button" onClick={onClose} aria-label="Close access dialog">
        <Icon name="close" />
      </button>
      <span className="tour-eyebrow">PRIVATE WORKSPACE</span>
      <h2 id="access-title">
        A little access,
        <br />a lot of possibility.
      </h2>
      <p>Enter the workspace access code to use live generation. Provider keys stay on the server.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSave(value.trim());
          onClose();
        }}
      >
        <label htmlFor="access-code">Workspace access code</label>
        <input
          id="access-code"
          type="password"
          value={value}
          required
          maxLength={256}
          autoComplete="off"
          onChange={(event) => setValue(event.target.value)}
        />
        <button type="submit" disabled={!value.trim()} className="tour-primaryButton">
          Use access code <Icon name="arrow" />
        </button>
      </form>
      <small>The code stays in memory until you reload. Live generation may incur provider costs.</small>
    </AccessDialogSurface>
  );
}
