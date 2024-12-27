import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth/useAuth";
import useAxiosSecure from "../../Hooks/useAxios/useAxiosSecure";
import Avatar from "../Shared/Navbar/Avatar";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const currentUser = users.find((userInfo) => userInfo?.email === user?.email);

  const {
    _id,
    name,
    email,
    role,
    gender,
    biography,
    currCity,
    institution,
    phone,
    profilePicture,
  } = currentUser || {};

  return (
    <div className=" mx-40 mt-10 p-5 border">
      <h2 className=" text-xl font-bold mb-3">Your Profile</h2>
      <div className=" grid grid-cols-1 justify-center">
        <div className=" mt-5 avatar">
          <div className=" w-40 rounded-full">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt=""
                className="w-full object-cover"
              />
            ) : (
              <Avatar></Avatar>
            )}
          </div>
        </div>

        <div className=" mt-5">
          <h1 className=" text-xl font-bold">
            {name}{" "}
            <span className=" badge badge-primary capitalize">{role}</span>
          </h1>
        </div>

        {biography && (
          <div className=" mt-5 w-[500px]">
            <p>{biography}</p>
          </div>
        )}
      </div>

      <div className=" w-full mt-5 flex justify-between">
        <div className="">
          {currCity && (
            <div>
              <h2>
                Address: <span className=" font-bold">{currCity}</span>
              </h2>
            </div>
          )}
          {institution && (
            <div>
              <h2>
                Studying at <span className=" font-bold">{institution}</span>
              </h2>
            </div>
          )}
          <div>
            <h2>
              Signed up using Email <span className=" font-bold">{email}</span>
            </h2>
          </div>
          {phone && (
            <div>
              <h2>
                Phone: <span className=" font-bold">{phone}</span>
              </h2>
            </div>
          )}
          {gender && (
            <div>
              <h2>
                Gender: <span className=" font-bold capitalize">{gender}</span>
              </h2>
            </div>
          )}
        </div>
        <div className="">
          <Link
            className="btn btn-outline btn-primary"
            to={`/update-profile/${_id}`}
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
