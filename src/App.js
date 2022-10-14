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
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    priority: 1,
    todoState: "DONE",
    content: "공부하기 1",
    date: 1665132215681,
  },
  {
    id: 2,
    priority: 2,
    todoState: "TODO",
    content: "공부하기 2",
    date: 1665132215682,
  },
  {
    id: 3,
    priority: 2,
    todoState: "DONE",
    content: "공부하기 3",
    date: 1665132215683,
  },
  {
    id: 4,
    priority: 3,
    todoState: "TODO",
    content: "공부하기 4",
    date: 1665132215684,
  },
  {
    id: 5,
    priority: 3,
    todoState: "TODO",
    content: "공부하기 5",
    date: 1665132215685,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);
  // CREATE
  const onCreate = (date, content, priority, todoState) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        priority,
        todoState: "TODO",
      },
    });
  };
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE" }, targetId);
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
