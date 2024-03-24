export const sortByTime = (comments, ascending = true) => {
  if (ascending) {
    comments.sort((a, b) => a.commentTime - b.commentTime);
  } else {
    comments.sort((a, b) => b.commentTime - a.commentTime);
  }
  return comments;
};
