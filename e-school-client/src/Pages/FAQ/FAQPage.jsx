// import FAQBanner from "../../assets/images/banner-faq.png";

const FAQPage = () => {
  return (
    <div>
      <div className=" relative">
        {/* <img src={FAQBanner} alt="" className=" w-full h-44" /> */}
        <div className=" absolute inset-0 left-10 top-10 text-white space-y-3">
          <h2 className=" text-3xl font-bold">FAQ</h2>
          <p>Frequently Asked Questions by Learners</p>
        </div>
      </div>

      <div className=" w-[700px] mx-auto mt-10 space-y-3">
        <h2 className=" text-2xl text-black font-semibold pl-3">
          Course Related
        </h2>
        <div className="collapse collapse-plus bg-base-200 border rounded">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-black border text-lg font-medium">
            Are E-School courses Online or Offline?
          </div>
          <div className="collapse-content text-black bg-white">
            <p className="pt-3">
              E-School is a 100% e-Learning platform and we only provide online
              courses. We do not provide offline / onsite courses and we do not
              have any plan in near future to provide such course.
            </p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200 border rounded">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-black border text-lg font-medium">
            Do you provide video recording of live classes?
          </div>
          <div className="collapse-content text-black bg-white">
            <p className=" pt-3">
              Yes, we provide recording with some conditions. A student needs to
              regularly attend classes and exams. In case of any emergency
              problem, student needs to inform course instructor immediately and
              give proper explanation for his/her absence. If someone is absent
              without contacting course teacher, then video will not be
              provided. Also students needs to follow terms & conditions of
              using the video recording for personal use only.
            </p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200 border rounded">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-black border text-lg font-medium">
            Do you provide certificates after completing a course?
          </div>
          <div className="collapse-content text-black bg-white">
            <p className=" pt-3">
              Previously we have provided printed certificates to passing
              students only. But going forward, we will provide digital
              certificate to passing students. We do not provide certificate for
              only attending course.
            </p>
          </div>
        </div>

        <div className="collapse collapse-plus bg-base-200 border rounded">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-black border text-lg font-medium">
            Do you provide job placement upon passing course?
          </div>
          <div className="collapse-content text-black bg-white">
            <p className=" pt-3">
              Yes, we provide help in job placement in selected courses. But it
              is not guaranteed. If any company contact with us for recruiting
              our students, we refer our passing students. In future we have
              plan to extend this more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
