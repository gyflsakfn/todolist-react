import { useContext, useEffect, useRef, useState } from "react";
import { priorityList } from "../util/Priority";
import PriorityItem from "./PriorityItem";

import Button from "./Button";
import {
  TodoDispatchContext,
  TodoSelectContext,
  TodoStateContext,
} from "../App";

// toISOString사용 시 UTC 타임존 사용으로 인해 가공 후 반환
const getStringDate = (date) => {
  let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOffset = new Date(date.getTime() - offset);

  return dateOffset.toISOString().slice(0, 10);
};

const TodoEditor = () => {
  const [originData, setOriginData] = useState();
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(2);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [todoState, setTodoState] = useState();
  // const [state, setState] = useState(false);

  const todoList = useContext(TodoStateContext);
  const { onCreate, onEdit } = useContext(TodoDispatchContext);

  const { selectData, setSelectData } = useContext(TodoSelectContext);
  // console.log(selectData.select_id);

  // 취소 후 selectData의 값이 변하지 않을 때 문제가 있음..
  // context로 관리하여 props drilling 줄이기
  // useEffect(() => {
  //   setSelectData(parseInt(selectData));
  // }, [selectData, setSelectData]);

  useEffect(() => {
    if (todoList.length >= 1) {
      const targetTodo = todoList.find(
        (it) => parseInt(it.id) === parseInt(selectData.select_id)
      );
      setOriginData(targetTodo);
      // console.log(targetTodo);

      if (originData) {
        setDate(getStringDate(new Date(parseInt(originData.date))));
        setContent(originData.content);
        setPriority(originData.priority);
        setTodoState(originData.todoState);
      } else {
        onReset();
      }
    }
  }, [originData, todoList, selectData.select_id]);

  const handleClickPriority = (priority) => {
    setPriority(priority);
  };

  // const navigate = useNavigate();

  const onReset = () => {
    setDate(getStringDate(new Date()));
    setPriority(2);
    setContent("");
    // setSelectData(0);
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
    onEdit(originData.id, date, content, priority, todoState);
    onReset();
    setSelectData(0);
  };

  const onEditCancel = () => {
    setSelectData(0);
    onReset();
  };

  // const onRemoveTodo = () => {
  //   if (window.confirm("정말 삭제하시겠습니까?")) {
  //     onRemove(originData.id);
  //     setSelectState(0);
  //     onReset();
  //   }
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
        {selectData.select_id ? (
          <div>
            <Button text={"취소"} onClick={onEditCancel} />
            <Button text={"수정"} onClick={onEditTodo} type={"edit"} />
            {/* <Button text={"삭제"} type={"negative"} onClick={onRemoveTodo} /> */}
          </div>
        ) : (
          <Button text={"저장"} onClick={onCreateTodo} type={"save"} />
        )}
        {/* <Button text={"저장"} onClick={handleSubmit} type={"positive"} />
        <Button text={"취소"} /> */}
      </div>
    </div>
  );
};
export default TodoEditor;
