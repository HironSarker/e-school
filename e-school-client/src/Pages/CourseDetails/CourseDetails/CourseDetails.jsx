import { useParams } from "react-router-dom";
import CourseDetailsBanner from "../CourseDetailsBanner/CourseDetailsBanner";
import CourseDetailsLeftSide from "../CourseDetailsLeftSide/CourseDetailsLeftSide";
import CourseDetailsRightSide from "../CourseDetailsRightSide/CourseDetailsRightSide";
import { useQuery } from "@tanstack/react-query";



const CourseDetails = () => {

    const { id } = useParams();

    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${id}`);
        return response.json();
    };

    const { data: course = {} } = useQuery({
        queryKey: ["courses"],
        queryFn: fetchData
    });

    console.log(course);

    return (
        <div>
            <CourseDetailsBanner course={course}></CourseDetailsBanner>
            <div className=" grid grid-cols-3 px-10 mt-10">
                <div className=" col-span-2 pr-20">
                    <CourseDetailsLeftSide course={course}></CourseDetailsLeftSide>
                </div>
                <div>
                    <CourseDetailsRightSide course={course}></CourseDetailsRightSide>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;