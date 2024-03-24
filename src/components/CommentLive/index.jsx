import React, { useState } from "react";
import "./styles.css";
import { COMMENT_BOX_LABELS } from "../../constants/commentEnums.constants";
import { formatDate } from "../../utils/formatDate.utils";
import CommentEdit from "../CommentEdit";

const CommentLive = ({
  name,
  index,
  comment,
  commentTime,
  replies = [],
  isEdited,
  hideReplyButton,
  addNewReply,
  nested,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);

  const handleReplyClicked = () => {
    setShowReplyInput(true);
  };

  const handleEditClicked = () => {};

  const addReplyHandler = (reply, commentIndex) => {
    addNewReply(reply, commentIndex);
    setShowReplyInput(false);
  };

  return (
    <>
      <div className={`comment-box live ${nested ? "nested" : ""}`}>
        <div className="header">
          <p>{name}</p>
          <p>{formatDate(commentTime)}</p>
        </div>
        <p>
          {comment}
          {isEdited && <span>{` ${COMMENT_BOX_LABELS.EDITED}`}</span>}
        </p>
        <div className="footer">
          {!hideReplyButton && <p onClick={handleReplyClicked}>Reply</p>}
          <p onClick={handleEditClicked}>Edit</p>
        </div>
      </div>
      {showReplyInput && (
        <CommentEdit
          index={index}
          label={COMMENT_BOX_LABELS.REPLY}
          addNewComment={addReplyHandler}
          nested
        />
      )}
      {replies.map(({ name, comment, commentTime, isEdited }, index) => (
        <CommentLive
          key={index}
          name={name}
          comment={comment}
          commentTime={commentTime}
          isEdited={isEdited}
          hideReplyButton
          nested
        />
      ))}
    </>
  );
};

export default CommentLive;
