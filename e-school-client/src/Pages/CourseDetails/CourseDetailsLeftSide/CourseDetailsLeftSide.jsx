const CourseDetailsLeftSide = ({ course }) => {

    const { courseIntroduction, courseLevel, courseOutline } = course;

    return (
        <div>
            <p>{courseIntroduction}</p>

            <div className=" space-y-2 mt-3">
                <h2 className=" text-xl font-bold">Who Can Join This Course?</h2>
                <p>{courseLevel}</p>
            </div>

            <div className=" space-y-2 mt-5">
                <h2 className=" text-xl font-bold">Course Outline</h2>
                <p>
                    {courseOutline}
                </p>
            </div>
        </div>
    );
};

export default CourseDetailsLeftSide;