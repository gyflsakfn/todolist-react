const TodoList = ({ todoList }) => {
  return (
    <div>
      {todoList.map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};
export default TodoList;
