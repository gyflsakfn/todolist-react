import classNames from "classnames";
import { useCallback } from "react";
import style from "../App.css";

const Test = ({ curDate, todoList }) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  // console.log(curDate);
  // const Dayday = () => {
  //   const days = [];
  //   const numberOfDates = new Date(
  //     curDate.getFullYear(),
  //     curDate.getMonth() + 1, // month의 index에 +1
  //     0 // new Date(2022,1,0).getDate() 하면 해당 월의 일수를 얻을 수 있다.
  //   ).getDate();
  //   console.log(numberOfDates);
  //   for (let i = 0; i < numberOfDates; i++) {
  //     days.push(
  //       <div className="days_col" key={i}>
  //         {i + 1}
  //       </div>
  //     );
  //   }
  //   return <div className="days_item">{days}</div>;
  // };

  // return (
  //   <div className="TodoCalendar">
  //     {/* <div>{initialState.date}</div> */}
  //     <Dayday />
  //   </div>
  // );
  const cx = classNames.bind(style);
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };

  const dateTotalCount = new Date(
    curDate.getFullYear(),
    curDate.getMonth() + 1, // month의 index에 +1
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
      const day = new Date(
        curDate.getFullYear(),
        curDate.getMonth() - 1,
        1
      ).getDay();
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          dayArr.push(
            <div
              key={i + 1}
              className={cx(
                {
                  //오늘 날짜일 때 표시할 스타일 클라스네임
                  today:
                    today.year === curDate.getFullYear() &&
                    today.month === curDate.getMonth() &&
                    today.date === i + 1,
                },
                { weekday: true }, //전체 날짜 스타일
                {
                  //전체 일요일 스타일
                  sunday:
                    new Date(
                      curDate.getFullYear(),
                      curDate.getMonth() - 1,
                      i + 1
                    ).getDay() === 0,
                },
                {
                  //전체 토요일 스타일
                  saturday:
                    new Date(
                      curDate.getFullYear(),
                      curDate.getMonth() - 1,
                      i + 1
                    ).getDay() === 6,
                }
              )}
            >
              {i + 1}
            </div>
          );
        }
      } else {
        dayArr.push(<div className="weekday"></div>);
      }
    }

    return dayArr;
  }, [
    curDate.getFullYear(),
    curDate.getMonth(),
    dateTotalCount,
    curDate,
    week,
  ]);

  return (
    <div className="container">
      <div className="week">{returnWeek()}</div>
      <div className="date">{returnDay()}</div>
    </div>
  );
};

export default Test;
