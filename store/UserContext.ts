import React, { useState } from "react";

const UserContext = React.createContext({
  apiKey: "",
  getUserInfo: () => {},
  clearLocalStorage: () => {},
});

export const UserContextProvider = (props) => {
  // <========== Variables ==========>
  const initialApiKey = localStorage.getItem("apiKey");
  const [apiKey, setApiKey] = useState(initialApiKey);

  // <========== Functions ==========>
  const getUserInfoHandler = (token) => {
    // Get the user's API key
    fetch("https://occomy.com/api/request/userinfo?token=" + token).then(
      (res) => {
        if (res.ok) {
          return res.json().then((data) => {
            const userData = data.response;

            // Save all of the data
            setApiKey(userData.apiKey);

            // Store all of the data locally
            localStorage.setItem("apiKey", userData.apiKey);
          });
        }
      }
    );
  };

  const clearLocalStorageHandler = () => {
    localStorage.removeItem("apiKey");
  };

  // <========== Context Value ==========>
  const contextValue = {
    apiKey: apiKey,
    getUserInfo: getUserInfoHandler,
    clearLocalStorage: clearLocalStorageHandler,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
