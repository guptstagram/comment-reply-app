export const getLocalStorageItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.log("A____getLocalStorageItemCatch", e);
    localStorage.setItem(key, JSON.stringify({}));
  }
};

export const setLocalStorageItem = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.log("A____setLocalStorageItemCatch", e);
    localStorage.setItem(key, JSON.stringify({}));
  }
};
