import { useContext, useEffect, useRef, useState } from "react";
import { priorityList } from "../util/Priority";
import PriorityItem from "./PriorityItem";

import Button from "./Button";
import { TodoDispatchContext, TodoStateContext } from "../App";

// toISOString사용 시 UTC 타임존 사용으로 인해 가공 후 반환
const getStringDate = (date) => {
  let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOffset = new Date(date.getTime() - offset);

  return dateOffset.toISOString().slice(0, 10);
};

const TodoEditor = ({ selectData }) => {
  const [originData, setOriginData] = useState();
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(2);
  const [date, setDate] = useState(getStringDate(new Date()));
  // const [state, setState] = useState(false);

  const [selectState, setSelectState] = useState();

  const todoList = useContext(TodoStateContext);
  const { onCreate, onEdit } = useContext(TodoDispatchContext);

  useEffect(() => {
    if (selectData) {
      setSelectState(parseInt(selectData));
    }
  }, [selectData]);

  useEffect(() => {
    if (todoList.length >= 1) {
      const targetTodo = todoList.find(
        (it) => parseInt(it.id) === parseInt(selectState)
      );
      setOriginData(targetTodo);

      if (originData) {
        setDate(getStringDate(new Date(parseInt(originData.date))));
        setContent(originData.content);
        setPriority(originData.priority);
      } else {
        onReset();
      }
    }
  }, [selectState, originData, todoList]);

  const handleClickPriority = (priority) => {
    setPriority(priority);
  };

  // const navigate = useNavigate();

  const onReset = () => {
    setDate(getStringDate(new Date()));
    setPriority(2);
    setContent("");
  };

  const onCreateTodo = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    alert("저장하시겠습니까?");
    onCreate(date, content, priority);
    onReset();
  };

  const onEditTodo = () => {
    onEdit(originData.id, date, content, priority);
    setSelectState(0);
    onReset();
  };

  // const onEditCancel = () => {
  //   setSelectState(0);
  //   onReset();
  // };
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
        {selectState ? (
          <div>
            <Button text={"취소"} onClick={onEditTodo} />
            <Button text={"수정"} onClick={onEditTodo} />
          </div>
        ) : (
          <Button text={"저장"} onClick={onCreateTodo} type={"positive"} />
        )}
        {/* <Button text={"저장"} onClick={handleSubmit} type={"positive"} />
        <Button text={"취소"} /> */}
      </div>
    </div>
  );
};
export default TodoEditor;
