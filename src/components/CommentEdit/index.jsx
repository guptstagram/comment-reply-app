import React, { useState } from "react";
import "./styles.css";
import {
  COMMENT_BOX_LABELS,
  COMMENT_BOX_PLACEHOLDERS,
} from "../../constants/commentEnums.constants";

const CommentEdit = ({
  index,
  label = COMMENT_BOX_LABELS.COMMENT,
  nested,
  disableNameInput,
  addNewComment,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [textAreaVal, setTextAreaVal] = useState("");

  const handleInputChanged = (e) => {
    setInputVal(e.target.value);
  };

  const handleTextAreaChanged = (e) => {
    setTextAreaVal(e.target.value);
  };

  const handleButtonClicked = () => {
    if (!inputVal || !textAreaVal) alert("please enter name and comment");
    addNewComment(
      {
        name: inputVal,
        comment: textAreaVal,
        commentTime: new Date().getTime(),
      },
      index
    );
    setInputVal("");
    setTextAreaVal("");
  };

  return (
    <div className={`comment-box ${nested ? "nested" : ""}`}>
      <p>{label}</p>
      <input
        type="text"
        value={inputVal}
        onChange={handleInputChanged}
        placeholder={COMMENT_BOX_PLACEHOLDERS.NAME}
        disabled={disableNameInput}
      />
      <textarea
        value={textAreaVal}
        onChange={handleTextAreaChanged}
        placeholder={COMMENT_BOX_PLACEHOLDERS.COMMENT}
      />
      <button
        onClick={handleButtonClicked}
        disabled={!inputVal || !textAreaVal}
      >
        {COMMENT_BOX_LABELS.POST}
      </button>
    </div>
  );
};

export default CommentEdit;
