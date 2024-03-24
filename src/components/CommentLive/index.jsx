import React, { useState } from "react";
import "./styles.css";
import {
  COMMENT_BOX_LABELS,
  COMMENT_BOX_PLACEHOLDERS,
} from "../../constants/commentEnums.constants";
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
  editComment,
  editReply,
  nested,
}) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showEditComment, setShowEditComment] = useState(false);

  const [textAreaVal, setTextAreaVal] = useState("");
  const handleTextAreaChanged = (e) => {
    setTextAreaVal(e.target.value);
  };

  const handleReplyClicked = () => {
    setShowReplyInput(true);
  };

  const handleEditClicked = () => {
    setTextAreaVal(comment);
    setShowEditComment(true);
  };

  const handleDoneClicked = () => {
    setShowEditComment(false);
    if (parentIndex || parentIndex === 0)
      editReply(parentIndex, index, textAreaVal);
    else editComment(index, textAreaVal);
    setTextAreaVal("");
  };

  const addReplyHandler = (reply, commentIndex) => {
    addNewReply(reply, commentIndex);
    setShowReplyInput(false);
  };

  const deleteClicked = () => {
    if (parentIndex || parentIndex === 0) deleteReply(parentIndex, index);
    else deleteComment(index);
  };

  return (
    <>
      <div className={`comment-box live ${nested ? "nested" : ""}`}>
        <div className="header">
          <p>{name}</p>
          <p>{formatDate(commentTime)}</p>
        </div>
        {showEditComment ? (
          <textarea
            value={textAreaVal}
            onChange={handleTextAreaChanged}
            placeholder={COMMENT_BOX_PLACEHOLDERS.COMMENT}
          />
        ) : (
          <p>
            {comment}
            {isEdited && <span>{` ${COMMENT_BOX_LABELS.EDITED}`}</span>}
          </p>
        )}
        <div className="delete" onClick={deleteClicked}>
          <BinIcon />
        </div>
        <div className="footer">
          {!hideReplyButton && <p onClick={handleReplyClicked}>Reply</p>}
          {showEditComment ? (
            <p onClick={handleDoneClicked}>{COMMENT_BOX_LABELS.DONE}</p>
          ) : (
            <p onClick={handleEditClicked}>{COMMENT_BOX_LABELS.EDIT}</p>
          )}
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
          editReply={editReply}
          nested
        />
      ))}
    </>
  );
};

export default CommentLive;
