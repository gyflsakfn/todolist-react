import Button from "../components/Button";
import DateInfo from "../components/DateInfo";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header headText={"헤더텍스트"} />
      <DateInfo
        dateText={"데이트텍스트"}
        rightChild={<Button text={"오른쪽 자식"} />}
        leftChild={<Button text={"왼쪽 자식"} />}
      />
    </div>
  );
};
export default Home;
