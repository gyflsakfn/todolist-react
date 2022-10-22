import { useState } from "react";
// import { useLocation } from "react-router-dom";

import { prioritySortOptionList } from "../util/PrioritySortOptionList";
import { sortOptionList } from "../util/SortOptionList";
import { todoStateOptionList } from "../util/TodoStateOptionList";

import ControlMenu from "./ControlMenu";
import TodoItem from "./TodoItem";
// import Button from "./Button";
// import TodoCalendar from "./TodoCalendar";

// const sortOptionList = [
//   { value: "latest", name: "최신순" },
//   { value: "oldest", name: "오래된순" },
// ];

// const priorityFilterOptionList = [
//   { value: "all", name: "전부" },
//   { value: "high", name: "높음" },
//   { value: "medium", name: "보통" },
//   { value: "low", name: "낮음" },
// ];

// const ControlMenu = ({ value, onChange, optionList }) => {
//   return (
//     <select
//       className="ControlMenu"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     >
//       {optionList.map((it, index) => (
//         <option key={index} value={it.value}>
//           {it.name}
//         </option>
//       ))}
//     </select>
//   );
// };

const TodoList = ({ todoList }) => {
  // 정렬 기준을 저장할 state
  const [sortType, setSortType] = useState("oldest");
  const [todofilter, setTodoFilter] = useState("todo");
  const [prioritySort, setPrioritySort] = useState("high");
  // const sampleLocation = useLocation();
  // let pathName = sampleLocation.pathname;
  // console.log(pathName);

  // 최신순인지 오래된 순인지 분기하여 정렬된 리스트 반환하는 함수
  const getProcessedTodoList = () => {
    const filterCallback = (item) => {
      if (todofilter === "todo") {
        return !item.todoState;
      } else {
        return item.todoState;
      }
    };
    const compare = (a, b) => {
      const fi = new Date(a.date).getDate();
      const se = new Date(b.date).getDate();
      if (sortType === "oldest") {
        // console.log(fi);
        if (fi === se && prioritySort === "low") {
          return parseInt(b.priority) - parseInt(a.priority);
        } else if (fi === se && prioritySort === "high") {
          return parseInt(a.priority) - parseInt(b.priority);
        }
        return parseInt(fi) - parseInt(se);
      } else {
        if (fi === se && prioritySort === "low") {
          return parseInt(b.priority) - parseInt(a.priority);
        } else if (fi === se && prioritySort === "high") {
          return parseInt(a.priority) - parseInt(b.priority);
        }
        return parseInt(se) - parseInt(fi);
      }
    };

    const copyList = JSON.parse(JSON.stringify(todoList));
    const filteredList =
      todofilter === "all"
        ? copyList
        : copyList.filter((it) => filterCallback(it));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  return (
    <div className="TodoList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={todofilter}
            onChange={setTodoFilter}
            optionList={todoStateOptionList}
          />
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={prioritySort}
            onChange={setPrioritySort}
            optionList={prioritySortOptionList}
          />
        </div>
        <div className="right_col"></div>
      </div>
      {getProcessedTodoList().map((it) => (
        <TodoItem key={it.id} {...it} />
      ))}
      {/* {pathName === "/"
        ? getProcessedTodoList().map((it) => <TodoItem key={it.id} {...it} />)
        : getProcessedTodoList().map((it) => (
            <TodoCalendar key={it.id} {...it} />
          ))} */}
    </div>
  );
};

// todoList prop 비정상적 전달시에 기본props 설정
TodoList.defaultProps = {
  todoList: [],
};
export default TodoList;
