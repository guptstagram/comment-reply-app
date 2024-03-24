import { useState } from "react";
import { COMMENT_LOCAL_STORAGE_KEY } from "../constants/commentEnums.constants";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/storage.utils";

const useComments = () => {
  const persistedComments = getLocalStorageItem(COMMENT_LOCAL_STORAGE_KEY);

  const [comments, setCommentsFn] = useState([
    ...(Array.isArray(persistedComments) ? persistedComments : []),
  ]);

  const setComments = (updatedComments) => {
    setCommentsFn(updatedComments);
    setLocalStorageItem(COMMENT_LOCAL_STORAGE_KEY, updatedComments);
  };

  return [comments, setComments];
};

export default useComments;
