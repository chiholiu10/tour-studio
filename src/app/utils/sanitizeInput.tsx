import DOMPurify from "dompurify";

export const sanitizeInput = (input: string) => {
  return DOMPurify.sanitize(input);
};

export default sanitizeInput;
