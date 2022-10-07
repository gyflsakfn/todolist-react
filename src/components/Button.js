const Button = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative", "default"].includes(type)
    ? type
    : "defult";

  return (
    <button className={["btn", `btn_${btnType}`].join(" ")} onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
};

export default Button;
