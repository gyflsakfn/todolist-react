const TestCalItem = ({ day_id, id, content, date, priority, todoState }) => {
  console.log(day_id);
  console.log(date);

  const com = () => {
    const itemDate = new Date(parseInt(date));
    const dateda = itemDate.getDate();
    if (day_id === dateda) {
      return <div className="dayItems">{content}</div>;
    }
  };

  return <>{com()}</>;
};
export default TestCalItem;
