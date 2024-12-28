import useAxiosSecure from "../../../Hooks/useAxios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UserRow from "./UserRow";


const Users = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !isLoading && users.map((user, idx) => (
                                <UserRow
                                    key={user._id}
                                    user={user}
                                    idx={idx}
                                ></UserRow>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </div>

    );
};

export default Users;