const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Thu", "Wed", "Thrs", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="days_col" key={i}>
        {date[i]}
      </div>
    );
  }
  return <div>{days}</div>;
};

const TodoCalendar = ({ curDate, todoList }) => {
  // const today = new Date(date);

  // 초기 상태
  // const initialState = {
  //   year: today.getFullYear(),
  //   month: today.getMonth() + 1,
  //   date: today.getDate(),
  // };
  // console.log(initialState);

  console.log(curDate);
  const Dayday = () => {
    const days = [];
    const numberOfDates = new Date(
      curDate.getFullYear(),
      curDate.getMonth() + 1, // month의 index에 +1
      0 // new Date(2022,1,0).getDate() 하면 해당 월의 일수를 얻을 수 있다.
    ).getDate();
    console.log(numberOfDates);
    for (let i = 0; i < numberOfDates; i++) {
      days.push(
        <div className="days_col" key={i}>
          {i + 1}
        </div>
      );
    }
    return <div className="days_item">{days}</div>;
  };

  return (
    <div className="TodoCalendar">
      <RenderDays />
      <br />
      {/* <div>{initialState.date}</div> */}
      <Dayday />
    </div>
  );
};
export default TodoCalendar;
