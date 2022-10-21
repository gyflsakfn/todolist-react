import classNames from "classnames";
import { useCallback, useState } from "react";
import style from "../App.css";
import { prioritySortOptionList } from "../util/PrioritySortOptionList";
import { sortOptionList } from "../util/SortOptionList";
import { todoStateOptionList } from "../util/TodoStateOptionList";
import ControlMenu from "./ControlMenu";
import TestCalItem from "./TestCalItem";

const Test = ({ curDate, todoList }) => {
  // 정렬 기준을 저장할 state
  const [sortType, setSortType] = useState("oldest");
  const [todofilter, setTodoFilter] = useState("todo");
  const [prioritySort, setPrioritySort] = useState("high");

  const getProcessedTodoList = () => {
    const filterCallback = (item) => {
      if (todofilter === "todo") {
        return !item.todoState;
      } else {
        return item.todoState;
      }
    };
    // const sampleLocation = useLocation();
    const compare = (a, b) => {
      const fi = new Date(a.date).getDate();
      const se = new Date(b.date).getDate();
      if (sortType === "oldest") {
        // console.log(fi);
        if (fi === se && prioritySort === "low") {
          return parseInt(b.priority) - parseInt(a.priority);
        } else if (fi === se && prioritySort === "high") {
          return parseInt(a.priority) - parseInt(b.priority);
        }
        return parseInt(fi) - parseInt(se);
      } else {
        if (fi === se && prioritySort === "low") {
          return parseInt(b.priority) - parseInt(a.priority);
        } else if (fi === se && prioritySort === "high") {
          return parseInt(a.priority) - parseInt(b.priority);
        }
        return parseInt(se) - parseInt(fi);
      }
    };

    const copyList = JSON.parse(JSON.stringify(todoList));
    const filteredList =
      todofilter === "all"
        ? copyList
        : copyList.filter((it) => filterCallback(it));
    const sortedList = filteredList.sort(compare);

    return sortedList;
  };

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const cx = classNames.bind(style);
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const curDateYear = curDate.getFullYear();
  const curDateMonth = curDate.getMonth() + 1;
  // console.log(todoList);
  // console.log(curDateYear);
  // console.log(curDateMonth);
  // console.log(getProcessedTodoList());

  const dateTotalCount = new Date(
    curDateYear,
    curDateMonth, // month의 index에 +1
    0 // new Date(2022,1,0).getDate() 하면 해당 월의 일수를 얻을 수 있다.
  ).getDate();
  const returnWeek = useCallback(() => {
    //요일 반환 함수
    let weekArr = [];
    week.forEach((v) => {
      weekArr.push(
        <div
          key={v}
          className={cx(
            { weekday: true },
            { sunday: v === "일" },
            { saturday: v === "토" }
          )}
        >
          {v}
        </div>
      );
    });
    return weekArr;
  }, []);

  const returnDay = useCallback(() => {
    //선택된 달의 날짜들 반환 함수
    let dayArr = [];

    for (const nowDay of week) {
      const day = new Date(curDateYear, curDateMonth - 1, 1).getDay();
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          dayArr.push(
            <div
              key={i + 1}
              className={cx(
                {
                  //오늘 날짜일 때 표시할 스타일 클라스네임
                  today:
                    today.year === curDateYear &&
                    today.month === curDateMonth &&
                    today.date === i + 1,
                },
                { weekday: true }, //전체 날짜 스타일
                {
                  //전체 일요일 스타일
                  sunday:
                    new Date(curDateYear, curDateMonth - 1, i + 1).getDay() ===
                    0,
                },
                {
                  //전체 토요일 스타일
                  saturday:
                    new Date(curDateYear, curDateMonth - 1, i + 1).getDay() ===
                    6,
                }
              )}
            >
              <div className="dayday">
                {i + 1}{" "}
                {getProcessedTodoList().map((it) => (
                  <TestCalItem day_id={i} key={it.id} {...it} />
                ))}
              </div>
            </div>
          );
        }
      } else {
        dayArr.push(<div className="weekday"></div>);
      }
    }

    return dayArr;
  }, [curDateYear, curDateMonth, dateTotalCount, curDate, week]);

  const dayOfTodo = () => {
    returnDay().map((it) =>
      it.key === todoList.map((it) => it.id)
        ? console.log("있네")
        : console.log("없네")
    );
  };
  dayOfTodo();
  console.log(returnDay());
  return (
    <>
      {" "}
      <div className="left_col">
        <ControlMenu
          value={todofilter}
          onChange={setTodoFilter}
          optionList={todoStateOptionList}
        />
        <ControlMenu
          value={sortType}
          onChange={setSortType}
          optionList={sortOptionList}
        />
        <ControlMenu
          value={prioritySort}
          onChange={setPrioritySort}
          optionList={prioritySortOptionList}
        />
      </div>
      <div className="right_col"></div>
      <div className="container">
        <div className="week">{returnWeek()}</div>
        <div className="date">{returnDay()}</div>
      </div>
    </>
  );
};

export default Test;
