import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxios/useAxiosSecure";
import HomeBanner from "../HomeBanner/HomeBanner";
import LearnersSection from "../LearnersSection/LearnersSection";
import WhyES from "../WhyES/WhyES";

const Home = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["learners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/learners");
      return res.data;
    },
  });

  const allLearners = users.filter((user) => user.role === "learner");
  const numbersOfLearners = allLearners.length;
  // const numbersOfLearners = 5000;

  return (
    <div>
      <HomeBanner></HomeBanner>
      <WhyES></WhyES>
      <LearnersSection numbersOfLearners={numbersOfLearners}></LearnersSection>
    </div>
  );
};

export default Home;
