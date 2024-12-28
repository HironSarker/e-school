import { useParams } from "react-router-dom";
import Avatar from "../../Shared/Navbar/Avatar";
import useAxiosSecure from "../../../Hooks/useAxios/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const UserDetails = () => {
    const [axiosSecure] = useAxiosSecure();

    const { id } = useParams();

    const { data: userInfo, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${id}`);
            return res.data;
        }
    });

    console.log(id);

    const { name, email, role, gender, biography, currCity, institution, phone, profilePicture } = userInfo || {};


    // if (!isLoading) {
    //     const { name, email, role, gender, biography, currCity, institution, phone, profilePicture } = userInfo || {};
    // }

    // useEffect(() => {
    //     if (!isLoading) {
    //         const { name, email, role, gender, biography, currCity, institution, phone, profilePicture } = userInfo || {};
    //     }
    // }, [])

    const handleMakeLearner = (userInfo) => {
        axiosSecure.patch(`${import.meta.env.VITE_API_URL}/users/learner/${userInfo?._id}`)
            .then((data) => {
                if (data.data.modifiedCount > 0) {
                    refetch();
                    toast.success(`${name} is Learner Now!!!`);
                }
            });
    }

    const handleMakeInstructor = (userInfo) => {
        axiosSecure.patch(`${import.meta.env.VITE_API_URL}/users/instructor/${userInfo?._id}`)
            .then((data) => {
                if (data.data.modifiedCount > 0) {
                    refetch();
                    toast.success(`${name} is Instructor Now!!!`);
                }
            });
    }

    const handleMakeAdmin = (userInfo) => {
        axiosSecure.patch(`${import.meta.env.VITE_API_URL}/users/admin/${userInfo?._id}`)
            .then((data) => {
                if (data.data.modifiedCount > 0) {
                    refetch();
                    toast.success(`${name} is Admin Now!!!`);
                }
            });
    }

    return (
        <div className=" p-5 mx-40 flex flex-col justify-center items-center border">
            <div className=" mt-5 avatar">
                <div className=" w-40 rounded-full">
                    {
                        profilePicture ? <img src={profilePicture} alt="" /> : <Avatar></Avatar>
                    }
                </div>
            </div>

            <div className=" mt-5">
                <h1 className=" text-xl font-bold">{name}</h1>
            </div>

            {
                biography &&
                <div className=" mt-5 w-96">
                    <p>
                        {biography}
                    </p>
                </div>
            }

            <div className=" w-full mt-5">
                {
                    currCity &&
                    <div>
                        <h2>Current City: <span>{currCity}</span></h2>
                    </div>
                }
                {
                    institution &&
                    <div>
                        <h2>{institution}</h2>
                    </div>
                }
                <div>
                    <h2>Email: {email}</h2>
                </div>
                {
                    phone &&
                    <div>
                        <h2>Phone: <span>{phone}</span></h2>
                    </div>
                }
                {
                    gender &&
                    <div>
                        <h2>Gender: <span>{gender}</span></h2>
                    </div>
                }
                <div className=" flex items-center">
                    <div className="">
                        <h2 >Role: <span className=" capitalize">{role}</span></h2>
                    </div>
                    <div className=" ml-5 space-x-3">
                        {
                            (role !== "learner") &&
                            <button onClick={() => handleMakeLearner(userInfo)} className="btn btn-sm">Make Learner</button>
                        }
                        {
                            (role !== "instructor") &&
                            <button onClick={() => handleMakeInstructor(userInfo)} className="btn btn-sm">Make Instructor</button>
                        }
                        {
                            (role !== "admin") &&
                            <button onClick={() => handleMakeAdmin(userInfo)} className="btn btn-sm">Make Admin</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;