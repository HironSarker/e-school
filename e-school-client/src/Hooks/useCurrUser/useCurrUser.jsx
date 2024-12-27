import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth/useAuth";
import useAxiosSecure from "../useAxios/useAxiosSecure";

const useCurrUser = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: currUserInfo = {}, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/curr-user/${user?.email}`
      );
      return res.data;
    },
  });

  return [currUserInfo, refetch];
};

export default useCurrUser;
