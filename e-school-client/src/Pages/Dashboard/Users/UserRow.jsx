import { Link } from "react-router-dom";
import avatarImg from "../../../assets/avatar/avatar.jpg";

const UserRow = ({ user, idx }) => {
    return (
        <tr>
            <th>
                {idx + 1}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={user?.profilePicture || avatarImg} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{user?.name}</div>
                    </div>
                </div>
            </td>
            <td>
                {user?.email}
            </td>
            <td className=" capitalize">
                {user?.role}
            </td>
            <th>
                <Link to={`/dashboard/user-details/${user._id}`} className="btn btn-ghost btn-xs">Details</Link>
            </th>
        </tr>
    );
};

export default UserRow;