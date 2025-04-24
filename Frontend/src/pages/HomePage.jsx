import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import { useSelector } from "react-redux";

const HomePage = () => {
  console.log(
    "State: ",
    useSelector((state) => state)
  );
  return (
    <>
      <Navbar />
      <Slide />
      <Categories />
      <Footer />
    </>
  );
};

export default HomePage;
