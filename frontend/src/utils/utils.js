
// Parses userInfo from localstorage and returns it else returns null.
const getParsedUserInfoObjFromLocalStorage = () => {
  const userInfoStringified = localStorage.getItem("userInfo");
  if(userInfoStringified) return JSON.parse(userInfoStringified);
  else return null;
}

export { getParsedUserInfoObjFromLocalStorage }