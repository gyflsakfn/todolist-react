const TestCalItem = ({ day_id, id, content, date, priority, todoState }) => {
  // console.log(day_id);
  // console.log(date);
  const priorityType = [1, 2, 3].includes(priority) ? priority : "none";

  const com = () => {
    const itemDate = new Date(parseInt(date));
    const dateda = itemDate.getDate();
    // console.log(dateda);
    // console.log(day_id);
    if (day_id === dateda) {
      return (
        <div
          className={["dayItems", "priority", `priority_${priorityType}`].join(
            " "
          )}
        >
          {content}
        </div>
      );
    }
  };

  return <>{com()}</>;
};
export default TestCalItem;
