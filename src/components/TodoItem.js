import { useContext } from "react";

import Button from "./Button";
import { priorityList } from "../util/Priority";
import { TodoDispatchContext } from "../App";

// console.log(importanceList);

const ImportanceProp = ({ priority }) => {
  const priorityType = [1, 2, 3].includes(priority) ? priority : "none";

  // const compare = priorityList
  //   .map((it) => {
  //     if (parseInt(it.priority_id) === parseInt(priorityType))
  //       return it.priority_text;
  //     else
  //       return (
  //         <div key={it.priority_id} className="priority">
  //           알 수 없음
  //         </div>
  //       );
  //   })
  //   .filter((ele) => ele);
  // // console.log(compare);
  const compare = priorityList.find(
    (it) => it.priority_id === priorityType
  ).priority_text;

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
    if (window.confirm(`${content}를 완료하셨습니까?`)) {
      onDone(id, date);
    } else return;
  };
  const handleClickRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(id);
    }
  };

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
