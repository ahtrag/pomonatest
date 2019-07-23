import React, { useReducer } from "react";
import { Redirect } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
  name: "",
  auth: "login"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_CHANGE_INPUT":
      return { ...state, [action.name]: action.value };
    case "HANDLE_CHANGE_AUTH":
      return { ...state, auth: action.value };
    default:
      throw new Error("Invalid Action");
  }
};

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChangeInput = e => {
    dispatch({
      type: "HANDLE_CHANGE_INPUT",
      name: e.currentTarget.name,
      value: e.currentTarget.value
    });
  };

  const handleSubmitLogin = e => {
    e.preventDefault();

    fetch("https://pomonatodo.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.data.token) {
          localStorage.setItem("jwtToken", json.data.token);

          window.location.href = "/todo";
        } else {
          alert("Please try again!");
        }
      })

      //   .then(res => res.json())
      //   .then(json => {
      //     fetch(`https://pomonatodo.herokuapp.com/todo/user`, {
      //       method: "GET",
      //       withCredentials: true,
      //       credentials: "same-origin",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `${localStorage.getItem("jwtToken")}`
      //       }
      //     })
      //   })
      .catch(err => console.error("Login Error", err));
  };

  const handleSubmitRegister = e => {
    e.preventDefault();

    fetch("https://pomonatodo.herokuapp.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password
      })
    })
      .then(res => res.json())
      .then(json => localStorage.setItem("jwtToken", json.data.token))
      .catch(err => console.error("Register Error", err));
  };

  return localStorage.getItem("jwtToken") ? (
    <Redirect to="/todo" />
  ) : (
    <Context.Provider
      value={{
        state,
        dispatch,
        handleChangeInput,
        handleSubmitLogin,
        handleSubmitRegister
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
