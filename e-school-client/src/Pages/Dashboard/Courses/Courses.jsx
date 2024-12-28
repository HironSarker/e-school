import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxios/useAxiosSecure";
import CourseRow from "./CourseRow";

const Courses = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: courses = [], refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const res = await axiosSecure.get("/courses");
            return res.data;
        }
    });

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Course Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            courses.map((course, idx) => (
                                <CourseRow
                                    key={course._id}
                                    course={course}
                                    idx={idx}
                                    refetch={refetch}
                                ></CourseRow>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>

    );
};

export default Courses;