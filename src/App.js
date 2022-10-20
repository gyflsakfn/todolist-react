import React, { useEffect, useReducer, useRef, useState } from "react";

import { Reset } from "styled-reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Calendar from "./pages/Calendar";
import Home from "./pages/Home";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    case "DONE": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...it, todoState: true } : it
      );
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("todo", JSON.stringify(newState));
  return newState;
};

export const TodoStateContext = React.createContext();
export const TodoSelectContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [selectData, setSelectData] = useState("");

  useEffect(() => {
    const localData = localStorage.getItem("todo");
    if (localData) {
      const todoList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(todoList[0].id + 1);

      dispatch({ type: "INIT", data: todoList });
    }
  }, []);

  const dataId = useRef(6);
  // CREATE
  const onCreate = (date, content, priority) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        priority,
        todoState: false,
      },
    });
    dataId.current += 1;
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };
  // EDIT
  const onEdit = (targetId, date, content, priority, todoState) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        priority,
        todoState,
      },
    });
  };
  // DONE
  const onDone = (targetId, date) => {
    dispatch({
      type: "DONE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
      },
    });
  };

  return (
    <TodoStateContext.Provider value={data}>
      <TodoDispatchContext.Provider
        value={{ onCreate, onEdit, onRemove, onDone }}
      >
        <TodoSelectContext.Provider value={{ selectData, setSelectData }}>
          <BrowserRouter>
            <Reset />
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Calendar" element={<Calendar />} />
                <Route />
              </Routes>
            </div>
          </BrowserRouter>
        </TodoSelectContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;
