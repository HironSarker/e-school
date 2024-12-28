import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import useAuth from '../../../Hooks/useAuth/useAuth';
import useAxiosSecure from '../../../Hooks/useAxios/useAxiosSecure';
import toast from 'react-hot-toast';

const CourseCard = ({ course }) => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const navigate = useNavigate();
    const location = useLocation();

    console.log(course);
    const { _id, courseBanner, courseName, batchNumber, courseFee, courseIntroduction, registrationStartDate, registrationEndDate, courseStartDate } = course || {};

    const today = moment().format("YYYY-MM-DD");
    const isComingSoon = (today < registrationStartDate) ? true : false;
    const isRegistrationClosed = (today > registrationEndDate) ? true : false;
    const remDays = moment(registrationEndDate).fromNow("days");

    let registrationStatus;
    if (isComingSoon) {
        registrationStatus = "Coming soon";
    }
    else if (isRegistrationClosed) {
        registrationStatus = "Registration closed";
    }
    else {
        registrationStatus = remDays + " remaining";
    }

    const handleAddToCart = (course) => {
        if (user && user?.email) {
            const { _id, ...rest } = course;

            const bookingItem = {
                bookingItemId: _id,
                ...rest,
                email: user?.email,
            };

            axiosSecure.post("/courseBookings", bookingItem).then((res) => {
                if (res.data.insertedId) {
                    toast.success("Course added in course cart");
                    navigate("/dashboard/course-cart");
                }
                console.log(res.data);
                // else{
                //     toast.error()
                // }
            });
        } else {
            toast.error("You must have to login");
            navigate("/login", { state: { from: location } });
        }
    }

    return (
        <div className=" grid grid-cols-3 border shadow-lg h-96 rounded">

            <div className=' rounded-l overflow-hidden'>
                <img src={courseBanner} alt="" className=' w-full h-full' />
            </div>

            <div className=" col-span-2 p-5">
                <h2 className=' text-xl font-bold'>{courseName}</h2>
                <div className=' badge badge-accent'>
                    <p className=' text-sm font-semibold'>Batch <span>{batchNumber}</span></p>
                </div>
                <p className=' my-2'>{courseIntroduction?.length > 200 ? courseIntroduction.slice(0, 200) + "..." : courseIntroduction}</p>
                <p className=' font-bold mb-2'>Tk. <span>{courseFee}</span></p>
                <div className=' grid grid-cols-2'>
                    <div>
                        <h2 className=' mb-1 font-semibold'>Registration</h2>
                        <p className=' text-sm font-extrabold'>{registrationStatus}</p>

                    </div>
                    <div>
                        {
                            (isComingSoon || isRegistrationClosed) || <>
                                <h2 className=' mb-1 font-semibold'>Schedule</h2>
                                <p className=' text-sm font-extrabold'>Mon and Thu 09:00 PM - 11:00 PM</p>
                                <p className=' text-sm'>Starts From <span>{courseStartDate}</span></p>
                            </>
                        }
                    </div>
                </div>
                <div className=" space-x-3 flex justify-end mt-6">
                    <button onClick={() => handleAddToCart(course)} className="btn btn-outline btn-primary">Add to Cart</button>
                    <Link to={`/all-courses/${_id}`} className="btn btn-outline btn-primary">See Details</Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;