const PriorityItem = ({ priority_id, priority_text, onClick, isSelected }) => {
  return (
    <div
      onClick={() => onClick(priority_id)}
      className={[
        "PriorityItem",
        isSelected ? `PriorityItem_on_${priority_id}` : `PriorityItem_off`,
      ].join(" ")}
    >
      {priority_text}
    </div>
  );
};
export default PriorityItem;
