import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../../Hooks/useAxios/useAxiosSecure";
import EmptyInfo from "../../Shared/EmptyInfo/EmptyInfo";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { Link } from "react-router-dom";

const CourseCart = () => {
    const { user } = useAuth();

    const [axiosSecure] = useAxiosSecure();

    const { data: bookingItems = [], refetch } = useQuery({
        queryKey: ["courseBookings"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/courseBookings?email=${user?.email}`);
            return res.data;
        },
    });

    console.log(bookingItems);

    const handleDelete = (bookingItem) => {
        axiosSecure.delete(`/courseBookings/${bookingItem?._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
                refetch();
                toast.success("Your selected course has been deleted");
            }
        });
    };


    return (
        <div>
            <div className="w-full px-6">
                {bookingItems &&
                    Array.isArray(bookingItems) &&
                    bookingItems.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full text-center">
                            <thead className="bg-[#90c641e6]">
                                <tr className="text-white capitalize">
                                    <th></th>
                                    <th>Name</th>
                                    <th>Course Fee</th>
                                    <th>Delete</th>
                                    <th>Pay</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingItems &&
                                    bookingItems.map((bookingItem, idx) => (
                                        <tr key={bookingItem._id}>
                                            <th>{idx + 1}</th>

                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="w-32 h-16 rounded">
                                                            <img src={bookingItem?.courseBanner} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="font-bold">{bookingItem?.courseName}</div>
                                                </div>
                                            </td>

                                            <td>
                                                Tk. {bookingItem?.courseFee}
                                            </td>

                                            <td>
                                                <button
                                                    onClick={() => handleDelete(bookingItem)}
                                                    className="btn btn-ghost btn-sm"
                                                >
                                                    <RiDeleteBin6Line
                                                        className=" text-red-600"
                                                        size={20}
                                                    ></RiDeleteBin6Line>
                                                </button>
                                            </td>

                                            <td>
                                                <Link to={`/dashboard/payment/${bookingItem?._id}`}>
                                                    <button className="btn btn-ghost btn-sm">
                                                        <MdPayment
                                                            className="text-accent"
                                                            size={20}
                                                        ></MdPayment>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyInfo
                        message={"You didn't selected any course. Select first!"}
                        address={"/courses"}
                        label={"select course"}
                    />
                )}
            </div>
        </div>
    );
};

export default CourseCart;