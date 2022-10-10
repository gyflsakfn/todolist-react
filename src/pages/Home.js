import { useContext, useState } from "react";
import { TodoStateContext } from "../App";
import Button from "../components/Button";
import DateInfo from "../components/DateInfo";
import Header from "../components/Header";

const Home = () => {
  // Context의 TodoState를 불러옴
  const todoList = useContext(TodoStateContext);
  console.log(todoList);
  // 날짜의 상태
  const [curDate, setCurDate] = useState(new Date());
  // 현재 날짜 추출
  const dateText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  // 1달 증가
  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  // 1달 감소
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  return (
    <div>
      <Header headText={"헤더텍스트"} />
      <DateInfo
        dateText={dateText}
        leftChild={<Button text={"<"} onClick={decreaseMonth} />}
        rightChild={<Button text={">"} onClick={increaseMonth} />}
      />
    </div>
  );
};
export default Home;
