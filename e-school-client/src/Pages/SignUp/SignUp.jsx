import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth/useAuth";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { createUser, updateUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = (data) => {
    data.photo = null;
    const { email, name, password, role } = data || {};

    createUser(email, password)
      .then(() => {
        updateUser(name)
          .then(() => {
            const saveUser = { email, name, role };

            fetch(`${import.meta.env.VITE_API_URL}/users`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedID) {
                  reset();
                  toast.success("Successfully registration done");
                  navigate(from, { replace: true });
                }
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-4xl text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email Address is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters longer",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                  message:
                    "Ensure password has at least one uppercase letter and one special character",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>

          {/* Default Value Start*/}

          <input
            className=" hidden"
            defaultValue="learner"
            {...register("role")}
          />

          {/* Default Value End */}

          <input
            className="btn btn-accent w-full"
            value="Sign Up"
            type="submit"
          />
        </form>
        <p>
          Already have an account{" "}
          <Link className="text-primary" to="/login">
            Please Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};
export default SignUp;
