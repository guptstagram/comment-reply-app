import React from "react";
import "./styles.css";
import CommentEdit from "../../components/CommentEdit";
import { useToggle } from "../../hooks/useToggle";
import CommentLive from "../../components/CommentLive";
import { sortByTime } from "../../utils/sortByTime.utils";
import { deepCopyObject } from "../../utils/deepCopyObject.utils";
import useComments from "../../hooks/useComments";

const Comment = () => {
  const [sort, toggleSort] = useToggle(false);

  const [comments, setComments] = useComments();

  const addNewComment = (comment) => {
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
  };

  const addNewReply = (reply, commentIndex) => {
    const updatedComments = [...comments];
    if (!updatedComments[commentIndex].replies) {
      updatedComments[commentIndex].replies = [];
    }
    updatedComments[commentIndex] = {
      ...updatedComments[commentIndex],
      replies: [reply, ...updatedComments[commentIndex].replies],
    };
    setComments(updatedComments);
  };

  const deleteComment = (commentIndex) => {
    const updatedComments = [...comments];
    updatedComments.splice(commentIndex, 1);
    setComments(updatedComments);
  };

  const deleteReply = (commentIndex, replyIndex) => {
    const updatedComments = deepCopyObject(comments);
    const commentToUpdate = { ...updatedComments[commentIndex] };
    commentToUpdate.replies.splice(replyIndex, 1);
    updatedComments[commentIndex] = commentToUpdate;
    setComments(updatedComments);
  };

  const editComment = (commentIndex, comment) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].comment = comment;
    updatedComments[commentIndex].isEdited = true;
    setComments(updatedComments);
  };

  const editReply = (commentIndex, replyIndex, reply) => {
    const updatedComments = deepCopyObject(comments);
    const commentToUpdate = { ...updatedComments[commentIndex] };
    commentToUpdate.replies[replyIndex].comment = reply;
    commentToUpdate.replies[replyIndex].isEdited = true;
    updatedComments[commentIndex] = commentToUpdate;
    setComments(updatedComments);
  };

  const sortedComments = sortByTime(comments, sort);

  return (
    <div className="comment-container">
      <CommentEdit addNewComment={addNewComment} />
      <div className="sorter">
        <p onClick={toggleSort}>
          Sort By: Date and Time {sort ? <>&uarr;</> : <>&darr;</>}
        </p>
      </div>
      {sortedComments.map(
        ({ name, comment, commentTime, replies, isEdited }, index) => (
          <CommentLive
            key={index}
            index={index}
            name={name}
            comment={comment}
            commentTime={commentTime}
            replies={replies}
            isEdited={isEdited}
            addNewReply={addNewReply}
            deleteComment={deleteComment}
            deleteReply={deleteReply}
            editComment={editComment}
            editReply={editReply}
          />
        )
      )}
    </div>
  );
};

export default Comment;
