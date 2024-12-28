import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth/useAuth';
import useAxiosSecure from '../../../Hooks/useAxios/useAxiosSecure';

const CourseDetailsBanner = ({ course }) => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();

    const navigate = useNavigate();
    const location = useLocation();

    const { courseName, batchNumber, courseFee, courseBanner } = course;

    const handleAddToCart = (course) => {
        if (user && user?.email) {
            const { _id, ...rest } = course;

            const bookingItem = {
                bookingItemId: _id,
                ...rest,
                email: user?.email,
            };

            axiosSecure.post("/bookings", bookingItem).then((res) => {
                // if (res.data.insertedId) {
                //     toast.success("Course added in course cart");
                //     navigate("/dashboard/course-cart");
                // }
                console.log(res.data);
                const bookingId = res.data.bookingItemId;
                return bookingId;
            });
        } else {
            toast.error("You must have to login");
            navigate("/login", { state: { from: location } });
        }
    }

    return (
        <div className=''>
            <div className=' grid grid-cols-4 justify-center shadow-lg'>
                <div className=' col-span-3 px-10 pt-3'>
                    <h2 className=' text-3xl font-bold text-blue-600'>{courseName}</h2>
                    <div className=' badge badge-accent'>
                        <p className=' text-sm font-semibold'>Batch <span>{batchNumber}</span></p>
                    </div>
                    <p className=' font-bold my-3'>Tk. <span>{courseFee}</span></p>
                    <div className="">

                        <button onClick={() => handleAddToCart(course)} className="btn btn-outline btn-primary">
                            <Link to={`/dashboard/payment/${course?._id}`} >Register Now</Link>
                        </button>

                        <Link to="/classroom" className="btn btn-outline btn-primary">Enter Classroom</Link>
                    </div>
                </div>
                <div>
                    <img src={courseBanner} alt="" className=' w-full h-48' />
                </div>
            </div>
        </div>
    );
};

export default CourseDetailsBanner;