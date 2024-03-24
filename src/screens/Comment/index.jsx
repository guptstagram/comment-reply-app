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
    setComments((comments) => [...comments, comment]);
  };

  const addNewReply = (reply, commentIndex) => {
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      if (!updatedComments[commentIndex].replies) {
        updatedComments[commentIndex].replies = [];
      }
      updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        replies: [reply, ...updatedComments[commentIndex].replies],
      };
      return updatedComments;
    });
  };

  const deleteComment = (commentIndex) => {
    setComments((comments) => {
      const commentsCopy = [...comments];
      commentsCopy.splice(commentIndex, 1);
      return commentsCopy;
    });
  };

  const deleteReply = (commentIndex, replyIndex) => {
    setComments((prevComments) => {
      const updatedComments = deepCopyObject(prevComments);
      const commentToUpdate = { ...updatedComments[commentIndex] };
      commentToUpdate.replies.splice(replyIndex, 1);
      updatedComments[commentIndex] = commentToUpdate;
      return updatedComments;
    });
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
          />
        )
      )}
    </div>
  );
};

export default Comment;
