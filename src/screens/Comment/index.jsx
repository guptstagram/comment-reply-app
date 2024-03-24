import React, { useMemo, useState } from "react";
// import CommentEdit from "../../components/CommentEdit";
import "./styles.css";
import CommentEdit from "../../components/CommentEdit";
import { useToggle } from "../../hooks/useToggle";
import CommentLive from "../../components/CommentLive";
import { sortByTime } from "../../utils/sortByTime.utils";
import { deepCopyObject } from "../../utils/deepCopyObject.utils";

const Comment = () => {
  const [sort, toggleSort] = useToggle(false);

  // COMMENT SCHEMA
  // name,comment,commentTime,replies,isEdited
  const [comments, setComments] = useState([
    {
      name: "Sourabh Gupta",
      comment: "Hey beautiful",
      commentTime: 1711173435455,
      replies: [
        {
          name: "Sourabh Gupta reply",
          comment: "Hey beautiful reply",
          commentTime: 151917235455,
        },
      ],
    },
    {
      name: "Sourabh Gupta2",
      comment: "Hey beautiful",
      commentTime: 151217235455,
      replies: [
        {
          name: "Sourabh Gupta2 reply",
          comment: "Hey beautiful reply",
          commentTime: 151917235455,
        },
        {
          name: "Sourabh Gupta2 reply 2",
          comment: "Hey beautiful reply 2",
          commentTime: 151917235455,
        },
      ],
      isEdited: true,
    },
  ]);

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
      // const updatedComments = JSON.parse(JSON.stringify(prevComments));
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
