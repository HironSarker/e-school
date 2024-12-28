import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth/useAuth";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;

        const saveUser = {
          name: loggedUser?.displayName,
          email: loggedUser?.email,
          profilePicture: loggedUser?.photoURL,
          role: "learner",
        };

        fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              toast.success("Profile created successfully");
              navigate("/");
            }
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <input
        onClick={() => handleGoogleSignIn()}
        className="btn btn-outline w-full"
        value="Continue with google"
        type="submit"
      />
    </>
  );
};

export default SocialLogin;
