export const deepCopyObject = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  let newObj;

  if (Array.isArray(obj)) {
    newObj = [];
  } else {
    newObj = {};
  }

  for (let key in obj) {
    newObj[key] = deepCopyObject(obj[key]);
  }

  return newObj;
};
