import useAuth from "../../../Hooks/useAuth/useAuth";
import avatarImg from "../../../assets/avatar/avatar.jpg";

const Avatar = () => {
  const { user } = useAuth();

  return (
    <>
      <img src={user && user.photoURL ? user.photoURL : avatarImg} alt="" />
    </>
  );
};

export default Avatar;
