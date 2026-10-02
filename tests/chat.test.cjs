const { test } = require("node:test");
const assert = require("node:assert/strict");
require("./helpers/register-typescript.cjs");
const {
  normalizeMessage,
  appendMessage,
  MAX_MESSAGE_LENGTH,
  MAX_MESSAGES,
  demoReply,
} = require("../src/features/chat/chat-model.ts");

test("blank messages are rejected and surrounding whitespace is removed", () => {
  assert.equal(normalizeMessage(" \n\t "), "");
  assert.equal(normalizeMessage("  hello  "), "hello");
});

test("message length is bounded without changing plain text content", () => {
  assert.equal(normalizeMessage("a".repeat(MAX_MESSAGE_LENGTH + 100)).length, MAX_MESSAGE_LENGTH);
  assert.equal(normalizeMessage("<script>alert(1)</script>"), "<script>alert(1)</script>");
});

test("history stays bounded and immutable with stable message identities", () => {
  const history = Array.from({ length: MAX_MESSAGES }, (_, i) => ({ id: String(i), sender: "user", text: "hi" }));
  const message = { id: "new", sender: "bot", text: "reply" };
  const result = appendMessage(history, message);
  assert.equal(result.length, MAX_MESSAGES);
  assert.equal(result[0].id, "1");
  assert.equal(result.at(-1), message);
  assert.equal(history[0].id, "0");
});

test("demo provider returns a nonempty reply without a network dependency", async () => {
  const reply = await demoReply("hello", new AbortController().signal);
  assert.ok(normalizeMessage(reply));
});

// Render the real UI components to verify semantics and escaping as well as types.
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const Button = require("../src/shared/components/button.tsx").default;
const InputField = require("../src/shared/components/input-field.tsx").default;
const MessageBubble = require("../src/features/chat/components/message-bubble.tsx").default;

test("generic buttons honor disabled and default to a non-submitting type", () => {
  const html = renderToStaticMarkup(React.createElement(Button, { disabled: true }, "Send"));
  assert.match(html, /disabled=""/);
  assert.match(html, /type="button"/);
  assert.match(renderToStaticMarkup(React.createElement(Button, { type: "submit" }, "Send")), /type="submit"/);
});

test("new-window links include protection against opener access", () => {
  const html = renderToStaticMarkup(
    React.createElement(Button, { href: "https://example.com", target: "_blank" }, "Link"),
  );
  assert.match(html, /rel="noopener noreferrer"/);
});

test("message content renders as escaped text, including HTML payloads", () => {
  const html = renderToStaticMarkup(
    React.createElement(MessageBubble, { sender: "bot", text: "<script>alert(1)</script>" }),
  );
  assert.ok(!html.includes("<script>"));
  assert.match(html, /&lt;script&gt;/);
});

test("inputs have associated labels and propagate their length constraint", () => {
  const html = renderToStaticMarkup(
    React.createElement(InputField, {
      id: "message",
      value: "",
      onChange: () => {},
      maxLength: MAX_MESSAGE_LENGTH,
    }),
  );
  assert.match(html, /for="message"/);
  assert.match(html, /id="message"/);
  assert.match(html, /maxLength="2000"/);
});
