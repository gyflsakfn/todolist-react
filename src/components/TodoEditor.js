import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { priorityList } from "../util/Priority";
import PriorityItem from "./PriorityItem";

import Button from "./Button";
import { TodoDispatchContext } from "../App";

// toISOString사용 시 UTC 타임존 사용으로 인해 가공 후 반환
const getStringDate = (date) => {
  let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOffset = new Date(date.getTime() - offset);

  return dateOffset.toISOString().slice(0, 10);
};

const TodoEditor = () => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(2);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [state, setState] = useState(false);

  const { onCreate } = useContext(TodoDispatchContext);

  const handleClickPriority = (priority) => {
    setPriority(priority);
  };

  const navigate = useNavigate();

  const onReset = () => {
    setDate(getStringDate(new Date()));
    setPriority(2);
    setContent("");
  };

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    alert("저장하시겠습니까?");
    onCreate(date, content, priority, state);
    // navigate("/", { replace: true });
    onReset();
  };
  return (
    <div className="TodoEditor">
      <div className="test">
        <div className="editor_box">
          <input
            className="editor_date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
          />
          <input
            className="editor_text"
            placeholder="할 일을 작성하세요."
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="priority_box">
          {priorityList.map((it) => (
            <PriorityItem
              key={it.priority_id}
              {...it}
              onClick={handleClickPriority}
              isSelected={it.priority_id === priority}
            />
          ))}
        </div>
      </div>
      <div className="Control_box">
        <Button text={"저장"} onClick={handleSubmit} type={"positive"} />
        {/* <Button text={"취소"} /> */}
      </div>
    </div>
  );
};
export default TodoEditor;
