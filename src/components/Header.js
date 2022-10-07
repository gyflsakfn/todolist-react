const Header = ({ headText, leftChild, rightChild }) => {
  return (
    <header>
      <h1 className="head_title">Todo-List</h1>
      <nav>
        <div className="head_btn_left">{leftChild}</div>
        <div className="head_text">{headText}</div>
        <div className="head_btn_right">{rightChild}</div>
      </nav>
    </header>
  );
};
export default Header;
