import React, { useReducer, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { isStringEmptyOrInvalid } from "../../utils/constants";

const initialState = {
  filter: "",
  title: "",
  note: "",
  priority: Number(2),
  userData: {},
  editTitle: "",
  editPriority: 0,
  editNote: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_CHANGE_INPUT":
      return {
        ...state,
        [action.name]: action.value
      };
    case "RESET_STATE":
      return {
        ...initialState
      };
    case "FETCH_RESULT_USER_DATA":
      return {
        ...state,
        userData: action.userData
      };
    case "HANDLE_CHANGE_FILTER":
      return {
        ...state,
        [action.name]: action.value
      };
    case "INITIALIZE_EDIT":
      return {
        ...state,
        editTitle: action.editTitleValue,
        editNote: action.editNoteValue,
        editPriority: action.editPriorityValue
      };
    default:
      throw new Error("Invalid Action");
  }
};

const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Make Syncronus data user fetch

  // const fetchDataUser = async () => {
  //   const response = await fetch("https://pomonatodo.herokuapp.com/todo/user", {
  //     method: 'GET',
  //     headers: {
  //       Authorization : localStorage.getItem("jwtToken")
  //     }
  //   })
  //   const json = await response.json()
  //   dispatch({type : 'FETCH_RESULT_USER_DATA', userData: json})
  // }

  // useEffect(() => {
  //   fetchDataUser()
  // }, [])

  // =========================================================

  useEffect(() => {
    fetch("https://pomonatodo.herokuapp.com/todo/user", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      }
    })
      .then(res => res.json())
      .then(json =>
        dispatch({
          type: "FETCH_RESULT_USER_DATA",
          userData: json
        })
      );
  }, [state.userData]);

  const handleChangeInput = e => {
    dispatch({
      type: "HANDLE_CHANGE_INPUT",
      name: e.currentTarget.name,
      value: e.currentTarget.value
    });
  };

  const handleChangeFilter = e => {
    dispatch({
      type: "HANDLE_CHANGE_FILTER",
      name: e.currentTarget.name,
      value: e.currentTarget.value.toLowerCase().substr(0, 20)
    });
  };

  const filteredItems = items => {
    if (isStringEmptyOrInvalid(state.filter)) {
      return items;
    }
    return items.filter(item => {
      return item.title.toLowerCase().indexOf(state.filter) !== -1;
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
      .then(json => {
        dispatch({
          type: "RESET_STATE"
        });
        json
          ? console.log(json)
          : alert("Failed to fetch, check internet connection");
      });
  };

  const handleSubmitEditNotes = id => {
    fetch(`https://pomonatodo.herokuapp.com/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken")
      },
      body: JSON.stringify({
        title: state.editTitle,
        note: state.editNote,
        priority: state.editPriority
      })
    })
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "RESET_STATE"
        });
        json
          ? console.log(json)
          : alert("Failed to fetch, check internet connection");
      });
  };

  const handleSubmitDeleteNotes = id => {
    fetch(`https://pomonatodo.herokuapp.com/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken")
      }
    })
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "RESET_STATE"
        });
        json
          ? console.log(json)
          : alert("Failed to fetch, check internet connection");
      });
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
        handleSubmitAddNotes,
        handleChangeFilter,
        filteredItems,
        handleSubmitEditNotes,
        handleSubmitDeleteNotes
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
