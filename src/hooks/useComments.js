import { useState } from "react";
import { COMMENT_LOCAL_STORAGE_KEY } from "../constants/commentEnums.constants";
import useDeepCompareEffect from "use-deep-compare-effect";

const useComments = () => {
  const persistedComments = JSON.parse(
    localStorage.getItem(COMMENT_LOCAL_STORAGE_KEY)
  );

  // COMMENT SCHEMA
  // name,comment,commentTime,replies,isEdited
  const [comments, setComments] = useState([
    ...(Array.isArray(persistedComments) ? persistedComments : []),
  ]);

  useDeepCompareEffect(() => {
    localStorage.setItem(COMMENT_LOCAL_STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  return [comments, setComments];
};

export default useComments;
