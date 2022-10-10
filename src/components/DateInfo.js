const DateInfo = ({ dateText, leftChild, rightChild }) => {
  return (
    <div className="date_wrapper">
      <div className="date_btn_left">{leftChild}</div>
      <div className="date_text">{dateText}</div>
      <div className="date_btn_right">{rightChild}</div>
    </div>
  );
};
export default DateInfo;
