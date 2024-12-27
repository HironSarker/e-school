import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxios/useAxiosSecure";
import Avatar from "../Shared/Navbar/Avatar";

const UpdateUserProfile = () => {
  const [axiosSecure] = useAxiosSecure();
  const userInfo = useLoaderData();
  const navigate = useNavigate();

  const {
    _id,
    name,
    email,
    phone,
    biography,
    institution,
    linkedIn,
    profilePicture,
    currCity,
  } = userInfo || {};

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const imgHostingURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;

  const handleUpdateUserProfile = (data) => {
    // console.log(data);
    if (data.profilePicture[0] === undefined) {
      data.profilePicture = profilePicture;
      axiosSecure
        .put(`${import.meta.env.VITE_API_URL}/users/${_id}`, data)
        .then((data) => {
          console.log(data);
          if (data.data.modifiedCount > 0) {
            reset();
            toast.success("Profile update successfully");
            navigate("/user-profile");
          }
        });
    } else {
      const formData = new FormData();
      formData.append("image", data.profilePicture[0]);

      fetch(imgHostingURL, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgResponse) => {
          data.profilePicture = imgResponse.data.display_url;
          axiosSecure
            .put(`${import.meta.env.VITE_API_URL}/users/${_id}`, data)
            .then((data) => {
              console.log(data);
              if (data.data.modifiedCount > 0) {
                reset();
                toast.success("Profile update successfully");
                navigate("/user-profile");
              }
            });
        });
    }
  };

  return (
    <div className=" mx-40 mt-10 p-5 border">
      <h2 className="text-xl font-bold mb-3">Update your profile</h2>
      <form onSubmit={handleSubmit(handleUpdateUserProfile)}>
        <div className=" mt-5 avatar grid grid-cols-1">
          <div className=" w-40 rounded-full ">
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

          <label className="label mt-3">
            <span className="label-text font-bold">Change Picture</span>
          </label>

          <input
            type="file"
            {...register("profilePicture", {})}
            className="input w-full"
          />
        </div>

        <div className="mt-5 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-bold">Your Name</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            defaultValue={name}
            className="input input-bordered w-full "
          />
          {errors.name && (
            <p className="text-red-600">{errors.name?.message}</p>
          )}
        </div>

        <div className="mt-5 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-bold">Your Email</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            defaultValue={email}
            readOnly
            className="input input-bordered w-full max-w-xs"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email?.message}</p>
          )}
        </div>

        <div className="mt-5 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-bold">Your Address</span>
          </label>
          <input
            type="text"
            {...register("currCity", {})}
            defaultValue={currCity}
            className="input input-bordered w-full "
          />
        </div>

        <div className="mt-5 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-bold">Mobile Number</span>
          </label>
          <input
            type="tel"
            {...register("phone", {
              minLength: 11,
              maxLength: 11,
            })}
            defaultValue={phone}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.phone && (
            <p className="text-red-600">{errors.phone?.message}</p>
          )}
        </div>

        <div className="mt-5 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-bold">Biography</span>
          </label>
          <textarea
            type="text"
            {...register("biography")}
            defaultValue={biography}
            className="input input-bordered w-full max-w-xs h-32"
          />
          {errors.biography && (
            <p className="text-red-600">{errors.biography?.message}</p>
          )}
        </div>

        <div className="mt-5 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-bold">Gender</span>
          </label>
          <div className=" flex gap-5">
            <label>
              <input
                type="radio"
                value="male"
                {...register("gender")}
                defaultChecked
              />
              <span className=" ml-2">Male</span>
            </label>

            <label>
              <input type="radio" value="female" {...register("gender")} />
              <span className=" ml-2">Female</span>
            </label>
          </div>
        </div>

        <div className="mt-5 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-bold">
              School/College/University
            </span>
          </label>
          <input
            type="text"
            {...register("institution")}
            defaultValue={institution}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.institution && (
            <p className="text-red-600">{errors.institution?.message}</p>
          )}
        </div>

        <div className="mt-5 form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-bold">LinkedIn Profile Link</span>
          </label>
          <input
            type="text"
            {...register("linkedIn")}
            defaultValue={linkedIn}
            className="input input-bordered w-full max-w-xs"
          />
          {errors.linkedIn && (
            <p className="text-red-600">{errors.linkedIn?.message}</p>
          )}
        </div>

        <div className="mt-5 flex items-center justify-center">
          <input
            className=" btn btn-accent w-32"
            value="Save Changes"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateUserProfile;
