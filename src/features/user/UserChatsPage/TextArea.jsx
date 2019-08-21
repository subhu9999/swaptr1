import React from "react";

const TextArea = ({
  input,
  width,
  type,
  rows,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <textarea
      {...input}
      placeholder="Type Message"
      width={width}
      type="text"
      rows={rows}
      className="ml-3 chat-form-input "
      spellCheck="false"
      maxLength={140}
    />
  );
};

export default TextArea;
