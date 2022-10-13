const TodoItem = ({ id, content, date, importance }) => {
  return (
    <div className="TodoItem">
      <div className="todo_date">{date}</div>
      <div className="info_wrapper"></div>
    </div>
  );
};
export default TodoItem;
