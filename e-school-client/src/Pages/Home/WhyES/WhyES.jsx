const WhyES = () => {
  return (
    <div className=" my-20 mx-10 space-y-4">
      <h2 className=" text-4xl font-extrabold text-black drop-shadow-lg">
        <span>Why E-School?</span>
      </h2>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className=" shadow-2xl p-4 rounded space-y-2 border">
          <h2 className=" text-xl font-semibold text-black">
            Experienced Instructors
          </h2>
          <p className=" text-sm font-medium text-gray-500">
            With more than 10 years of experience of working in the IT industry,
            we intend to share with you what works
          </p>
        </div>

        <div className=" shadow-2xl p-4 rounded space-y-2 border">
          <h2 className=" text-xl font-semibold text-black">Career Guidance</h2>
          <p className=" text-sm font-medium text-gray-500">
            You will be guided to prepare yourself for the IT industry
          </p>
        </div>

        <div className=" shadow-2xl p-4 rounded space-y-2 border">
          <h2 className=" text-xl font-semibold text-black">Online</h2>
          <p className=" text-sm font-medium text-gray-500">
            No need to waste time in traffic jam. A good internet connection is
            all you need to start learning!
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyES;
