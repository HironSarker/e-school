import learnersImg from "../../../assets/images/students.png";

const LearnersSection = ({ numbersOfLearners }) => {
  return (
    <div className="my-20 mx-10 grid grid-cols-3 items-center">
      <div className=" col-span-2">
        <h2 className=" text-3xl font-semibold text-gray-800">
          Over {numbersOfLearners} students from multiple renowned universities
          and institutions across the country attended courses
        </h2>
      </div>
      <div>
        <img
          src={learnersImg}
          alt=""
          className=" rounded-full border shadow-lg"
        />
      </div>
    </div>
  );
};

export default LearnersSection;
