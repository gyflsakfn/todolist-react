import Button from "./Button";
import { priorityList } from "../util/Priority";

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

const TodoItem = ({ id, content, date, priority, setSelectData }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  return (
    <div className="TodoItem">
      <div className="info_wrapper" onClick={() => setSelectData(id)}>
        <div className="info__date">{strDate}</div>
        <div className="info__content">
          <ImportanceProp priority={priority} />
          {content}
        </div>
      </div>
      <div className="complete_wrapper">
        <Button type={"positive"} text={"완료"} />
      </div>
    </div>
  );
};
export default TodoItem;
