import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <>
      <Link to={"/"}>Home</Link>
      <Link to={"/new"}>New</Link>
    </>
  );
};

export default RouteTest;
