import { FaTrashAlt } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { MdOutlineUnpublished } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxios/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import UpdateCourse from "./UpdateCourse";


const CourseRow = ({ course, idx, refetch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [courseInfo, setCourseInfo] = useState({});

    const { _id, courseBanner, courseName, isPublished } = course || {};
    const [axiosSecure] = useAxiosSecure();
    console.log(course);

    const handlePublished = (id) => {
        axiosSecure.patch(`${import.meta.env.VITE_API_URL}/courses/published/${id}`)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    refetch();
                    toast.success("Course is published now!")
                }
            })
    }

    const handleHide = (id) => {
        axiosSecure.patch(`${import.meta.env.VITE_API_URL}/courses/hidden/${id}`)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    refetch();
                    toast.success("Course is hidden now!")
                }
            })
    }

    const handleModal = (course) => {
        setCourseInfo(course)
        setIsOpen(!isOpen)
    }

    const handleDeleteCourse = (id) => {
        axiosSecure.delete(`${import.meta.env.VITE_API_URL}/courses/remove/${id}`)
            .then(data => {
                console.log(data.data);
                if (data.data.deletedCount > 0) {
                    refetch();
                    toast.success("Course has been deleted!")
                }
            })
    }

    return (
        <>
            <UpdateCourse
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                courseInfo={courseInfo}
            ></UpdateCourse>
            <tr>
                <th>
                    {idx + 1}
                </th>
                <td>
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className=" w-40 h-20 rounded">
                                <img src={courseBanner} alt="" />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{courseName}</div>
                        </div>
                    </div>
                </td>

                <td className=" space-x-5">

                    {
                        isPublished === "false" &&
                        <button onClick={() => handlePublished(_id)} className="tooltip tooltip-top" data-tip="Published">
                            <MdOutlinePublishedWithChanges size={20}></MdOutlinePublishedWithChanges>
                        </button >
                    }
                    {
                        isPublished === "true" &&
                        <button onClick={() => handleHide(_id)} className="tooltip tooltip-top" data-tip="Hide">
                            <MdOutlineUnpublished size={20}></MdOutlineUnpublished>
                        </button>
                    }
                    <button onClick={() => handleModal(course)} className="tooltip tooltip-top" data-tip="Update course">
                        <LuFileEdit size={20} className=" text-blue-600"></LuFileEdit>
                    </button>
                    <button onClick={() => handleDeleteCourse(_id)} className="tooltip tooltip-top" data-tip="Delete course">
                        <FaTrashAlt size={20} className=" text-red-600"></FaTrashAlt>
                    </button>
                </td>

            </tr>
        </>
    );
};

export default CourseRow;