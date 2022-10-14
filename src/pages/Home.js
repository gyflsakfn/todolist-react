import { useContext, useEffect, useState } from "react";

import { TodoStateContext } from "../App";

import Button from "../components/Button";
import DateInfo from "../components/DateInfo";
import Header from "../components/Header";
import TodoEditor from "../components/TodoEditor";
import TodoList from "../components/TodoList";

const Home = () => {
  // Context의 TodoState를 불러옴
  const todoList = useContext(TodoStateContext);

  // 날짜에 따라 List가 달라져야하기에 새로운 state로 관리
  const [data, setData] = useState([]);

  // 날짜의 상태
  const [curDate, setCurDate] = useState(new Date());
  // 현재 날짜 추출
  const dateText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    if (todoList.length >= 1) {
      // 현재 달의 첫 날짜를 구함
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0
      ).getTime();

      setData(
        todoList.filter((it) => firstDay <= it.date && lastDay >= it.date)
      );
    }
  }, [todoList, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1),
      curDate.getTime()
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1),
      curDate.getTime()
    );
  };

  return (
    <div>
      <Header headText={"TodoList"} />
      <TodoEditor />
      <DateInfo
        dateText={dateText}
        leftChild={<Button text={"<"} onClick={decreaseMonth} />}
        rightChild={<Button text={">"} onClick={increaseMonth} />}
      />
      <TodoList todoList={data} />
    </div>
  );
};
export default Home;
