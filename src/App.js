import React, { useReducer, useRef } from "react";
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
    default:
      return state;
  }
  localStorage.setItem("todo", JSON.stringify(newState));
  return newState;
};

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(6);
  // CREATE
  const onCreate = (date, content, priority, todoState) => {
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
  const onEdit = (targetId, date, content, priority) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        priority,
      },
    });
  };

  return (
    <TodoStateContext.Provider value={data}>
      <TodoDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Calendar" element={<Calendar />} />
              <Route />
            </Routes>
          </div>
        </BrowserRouter>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export default App;
