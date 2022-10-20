const Header = ({ leftChild, headText, rightChild }) => {
  return (
    <header className="header_box">
      <div className="head_btn_left">{leftChild}</div>
      <h1 className="head_title">{headText}</h1>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  );
};
export default Header;
