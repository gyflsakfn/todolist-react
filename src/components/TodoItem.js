import { useContext } from "react";

import Button from "./Button";
import { priorityList } from "../util/Priority";
import { TodoDispatchContext } from "../App";

// console.log(importanceList);

const ImportanceProp = ({ priority }) => {
  const priorityType = [1, 2, 3].includes(priority) ? priority : "none";
  // let text = "";
  // if (importanceType === 1) {
  //   text = "높음";
  // } else if (importanceType === 2) {
  //   text = "중간";
  // } else if (importanceType === 3) {
  //   text = "낮음";
  // }
  const compare = priorityList
    .map((it) => {
      if (parseInt(it.priority_id) === parseInt(priorityType))
        return it.priority_text;
    })
    .filter((ele) => ele);
  return (
    <div className={["priority", `priority_${priorityType}`].join(" ")}>
      {compare}
    </div>
  );
};

const TodoItem = ({
  id,
  content,
  date,
  priority,
  setSelectData,
  todoState,
}) => {
  const getDay = () => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    // const strDate = new Date(parseInt(date)).toLocaleDateString();
    const itemDate = new Date(parseInt(date));
    const strDate = `${itemDate.getFullYear()}. ${
      itemDate.getMonth() + 1
    }. ${itemDate.getDate()}. ${week[itemDate.getDay()]}요일 `;
    return strDate;
  };

  const { onDone, onRemove } = useContext(TodoDispatchContext);
  const handleClickComplete = () => {
    onDone(id, date);
  };
  const handleClickRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(id);
      //     setSelectState(0);
      //     onReset();
    }
  };
  // const onRemoveTodo = () => {
  //   if (window.confirm("정말 삭제하시겠습니까?")) {
  //     onRemove(originData.id);
  //     setSelectState(0);
  //     onReset();
  //   }
  // };

  return (
    <div className="TodoItem">
      <div className="info_wrapper" onClick={(e) => setSelectData(id)}>
        <div className="info__date">{getDay()}</div>
        <div className="info__content">
          <ImportanceProp priority={priority} />
          {content}
        </div>
      </div>
      <div className="complete_wrapper">
        {todoState ? (
          <Button type={"remove"} text={"삭제"} onClick={handleClickRemove} />
        ) : (
          <Button
            type={"complete"}
            text={"완료"}
            onClick={handleClickComplete}
          />
        )}
      </div>
    </div>
  );
};
export default TodoItem;
