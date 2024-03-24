import React, { useState } from "react";
import "./styles.css";
import { COMMENT_BOX_LABELS } from "../../constants/commentEnums.constants";
import { formatDate } from "../../utils/formatDate.utils";
import CommentEdit from "../CommentEdit";
import BinIcon from "../../icons/BinIcon";

const CommentLive = ({
  name,
  parentIndex,
  index,
  comment,
  commentTime,
  replies = [],
  isEdited,
  hideReplyButton,
  addNewReply,
  deleteComment,
  deleteReply,
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

  const deleteClicked = () => {
    if (deleteComment) {
      deleteComment(index);
    }
    if (deleteReply) deleteReply(parentIndex, index);
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
        <div className="delete" onClick={deleteClicked}>
          <BinIcon />
        </div>
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
      {replies.map(({ name, comment, commentTime, isEdited }, currIndex) => (
        <CommentLive
          key={currIndex}
          parentIndex={index}
          index={currIndex}
          name={name}
          comment={comment}
          commentTime={commentTime}
          isEdited={isEdited}
          hideReplyButton
          deleteReply={deleteReply}
          nested
        />
      ))}
    </>
  );
};

export default CommentLive;
