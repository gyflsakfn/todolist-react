import { useState } from "react";
import Button from "./Button";
import TodoItem from "./TodoItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const importFilterOptionList = [
  { value: "all", name: "전부" },
  { value: "high", name: "높음" },
  { value: "medium", name: "보통" },
  { value: "low", name: "낮음" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, index) => (
        <option key={index} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const TodoList = ({ todoList }) => {
  // 정렬 기준을 저장할 state
  const [sortType, setSortType] = useState("lastest");
  const [importfilter, setImportFilter] = useState("all");

  // 최신순인지 오래된 순인지 분기하여 정렬된 리스트 반환하는 함수
  const getProcessedTodoList = () => {
    const filterCallback = (item) => {
      if (importfilter === "high") {
        return parseInt(item.importance) === 1;
      } else if (importfilter === "medium") {
        return parseInt(item.importance) === 2;
      } else {
        return parseInt(item.importance) === 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // 깊은 복사로 원본 배열을 손대지 않음
    const copyList = JSON.parse(JSON.stringify(todoList));
    const filteredList =
      importfilter === "all"
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
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={importfilter}
            onChange={setImportFilter}
            optionList={importFilterOptionList}
          />
        </div>
        <div className="right_col">
          <Button type={"default"} text={"수정"} />
          <Button type={"negative"} text={"삭제"} />
        </div>
      </div>

      {getProcessedTodoList().map((it) => (
        <TodoItem key={it.id} {...it} />
      ))}
    </div>
  );
};

// todoList prop 비정상적 전달시에 기본props 설정
TodoList.defaultProps = {
  todoList: [],
};
export default TodoList;
