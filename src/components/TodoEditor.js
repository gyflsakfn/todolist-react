import { useState } from "react";

import { priorityList } from "../util/Priority";

// toISOString사용 시 UTC 타임존 사용으로 인해 가공 후 반환
const getStringDate = (date) => {
  let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOffset = new Date(date.getTime() - offset);

  return dateOffset.toISOString().slice(0, 10);
};

const TodoEditor = () => {
  const [date, setDate] = useState(getStringDate(new Date()));

  return (
    <div className="TodoEditor">
      <div className="editor_box">
        <input
          className="editor_date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          type="date"
        />
        <input />
        <div>
          {priorityList.map((it) => (
            <div key={it.priority_id}>{it.priority_text}</div>
          ))}
        </div>
      </div>
      <div className="editor_btn">버튼이 들어옴</div>
    </div>
  );
};
export default TodoEditor;
