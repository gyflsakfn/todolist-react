import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
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

  // 최신순인지 오래된 순인지 분기하여 정렬된 리스트 반환하는 함수
  const getProcessedTodoList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    // 깊은 복사로 원본 배열을 손대지 않음
    const copyList = JSON.parse(JSON.stringify(todoList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedTodoList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

// todoList prop 비정상적 전달시에 기본props 설정
TodoList.defaultProps = {
  todoList: [],
};
export default TodoList;
