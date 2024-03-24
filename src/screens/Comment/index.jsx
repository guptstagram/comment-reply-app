import React, { useMemo, useState } from "react";
// import CommentEdit from "../../components/CommentEdit";
import "./styles.css";
import CommentEdit from "../../components/CommentEdit";
import { useToggle } from "../../hooks/useToggle";
import CommentLive from "../../components/CommentLive";
import { sortByTime } from "../../utils/sortByTime.utils";

const Comment = () => {
  const [sort, toggleSort] = useToggle(false);

  // COMMENT SCHEMA
  // name,comment,commentTime,replies,isEdited
  const [comments, setComments] = useState([
    {
      name: "Sourabh Gupta",
      comment: "Hey beautyiful",
      commentTime: 1711173435455,
      replies: [
        {
          name: "Sourabh Gupta reply",
          comment: "Hey beautyiful reply",
          commentTime: 151917235455,
        },
      ],
    },
    {
      name: "Sourabh Gupta2",
      comment: "Hey beautyiful",
      commentTime: 151217235455,
      replies: [],
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
          />
        )
      )}
    </div>
  );
};

export default Comment;
