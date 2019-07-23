import React, { useReducer, useEffect } from "react";
import { Redirect } from "react-router-dom";

const initialState = {
  filter: "",
  title: "",
  note: "",
  priority: Number(2)
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_CHANGE_INPUT":
      return { ...state, [action.name]: action.value };
    default:
      throw new Error("Invalid Action");
  }
};

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch("https://pomonatodo.herokuapp.com/todo/user", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      }
    })
      .then(res => res.json())
      .then(json => console.log("GET user data", json));
  }, []);

  const handleChangeInput = e => {
    dispatch({
      type: "HANDLE_CHANGE_INPUT",
      name: e.currentTarget.name,
      value: e.currentTarget.value
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwtToken");

    window.location.href = "/";
  };

  const handleSubmitAddNotes = () => {
    fetch("https://pomonatodo.herokuapp.com/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken")
      },
      body: JSON.stringify({
        title: state.title,
        note: state.note,
        priority: state.priority
      })
    })
      .then(res => res.json())
      .then(json => console.log(json));
  };

  return !localStorage.getItem("jwtToken") ? (
    <Redirect to="/" />
  ) : (
    <Context.Provider
      value={{
        state,
        dispatch,
        handleLogOut,
        handleChangeInput,
        handleSubmitAddNotes
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
