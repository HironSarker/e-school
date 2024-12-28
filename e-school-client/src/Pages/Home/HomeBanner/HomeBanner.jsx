import { Link } from "react-router-dom";
import homeBanner from "../../../assets/images/Home-banner-2.png";

const HomeBanner = () => {
  return (
    <div className=" relative">
      <img src={homeBanner} alt="" className=" rounded drop-shadow-xl" />
      <div className=" absolute inset-y-20 right-28 w-[500px] space-y-4">
        <h2 className=" text-4xl font-bold">
          All you need to be a good software engineer
        </h2>
        <Link to="/all-courses" className="btn btn-primary w-32">
          See all courses
        </Link>
        <p className=" text-xs font-semibold">
          Get latest news, course updates related to software engineering
        </p>
      </div>
    </div>
  );
};

export default HomeBanner;
