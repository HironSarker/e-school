import { useForm, Controller } from "react-hook-form";
import Modal from "../../../Components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxios/useAxiosSecure";
import toast from "react-hot-toast";

const fetchData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/instructors`);
    return response.json();
};

const UpdateCourse = ({ isOpen, setIsOpen, courseInfo }) => {
    const [axiosSecure] = useAxiosSecure();
    const { register, control, formState: { errors }, handleSubmit, setValue, getValues } = useForm();

    const { _id, courseBanner, courseName, batchNumber, courseFee, courseIntroduction, registrationStartDate, registrationEndDate, courseStartDate, courseLevel, courseDurationInMonths, selectedInstructor, courseOutline } = courseInfo;

    const { data: instructors = [], isLoading } = useQuery({
        queryKey: ["instructors"],
        queryFn: fetchData
    });

    const imgHostingURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`

    // -----------------------

    const applyStyleToSelection = (style) => {
        const textarea = document.getElementById('myTextarea');
        const { selectionStart, selectionEnd } = textarea;

        const currentValue = getValues('courseOutline');

        const prefix = currentValue.substring(0, selectionStart);
        const selectedText = currentValue.substring(selectionStart, selectionEnd);
        const suffix = currentValue.substring(selectionEnd);

        // Apply the style to the selected text
        const styledText = `${style}${selectedText}${style}`;

        // Update the textarea with the modified text
        setValue('courseOutline', `${prefix}${styledText}${suffix}`);

        // Adjust the selection to cover the newly applied styled text
        textarea.setSelectionRange(
            selectionStart + style.length,
            selectionEnd + style.length
        );
    };

    //--------------------------

    const handleUpdateCourse = (data) => {
        data.batchNumber = parseInt(data.batchNumber);
        data.courseDurationInMonths = parseInt(data.courseDurationInMonths);
        data.courseFee = parseInt(data.courseFee);

        if (data.courseBanner[0] === undefined) {
            data.courseBanner = courseBanner;
            axiosSecure.put(`${import.meta.env.VITE_API_URL}/courses/update-course/${_id}`, data)
                .then(data => {
                    console.log(data);
                    if (data.data.modifiedCount > 0) {
                        toast.success("Course update successfully");
                        setIsOpen(!isOpen);
                    }
                })
        }
        else {
            const formData = new FormData();
            formData.append("image", data.courseBanner[0]);

            fetch(imgHostingURL, {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
                .then(imgResponse => {
                    data.courseBanner = imgResponse.data.display_url
                    axiosSecure.put(`${import.meta.env.VITE_API_URL}/courses/update-course/${_id}`, data)
                        .then(data => {
                            console.log(data);
                            if (data.data.modifiedCount > 0) {
                                toast.success("Course update successfully");
                                setIsOpen(!isOpen);
                            }
                        })
                })
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={courseName}
        >

            <div className="flex justify-center items-center">
                <div className="w-full p-7">
                    <h2 className='text-xl font-bold text-blue-700'>Update Course</h2>
                    <form onSubmit={handleSubmit(handleUpdateCourse)}>

                        <div className=" grid grid-cols-2 gap-4">
                            {/* Course Intro */}
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text font-bold">Course Introduction</span>
                                </label>
                                <textarea
                                    {
                                    ...register("courseIntroduction", {
                                        required: "Course introduction is required",
                                    })
                                    }
                                    defaultValue={courseIntroduction}
                                    className="textarea textarea-bordered border-2 w-full"
                                ></textarea>
                                {errors.courseIntroduction && <p className='text-red-600'>{errors.courseIntroduction?.message}</p>}
                            </div>

                            {/* Who Can Join This Course */}
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text font-bold">Who can join this course?</span>
                                </label>
                                <textarea
                                    {
                                    ...register("courseLevel", {
                                        required: "Course level is required",
                                    })
                                    }
                                    defaultValue={courseLevel}
                                    className="textarea textarea-bordered border-2 w-full"
                                ></textarea>
                                {errors.courseLevel && <p className='text-red-600'>{errors.courseLevel?.message}</p>}
                            </div>
                        </div>

                        <div className=" grid grid-cols-4 gap-4">
                            {/* Course Name */}
                            <div className="form-control w-full mt-2 col-span-3">
                                <label className="label">
                                    <span className="label-text font-bold">Course Name</span>
                                </label>
                                <input
                                    type="text"{
                                    ...register("courseName", {
                                        required: "Course name is required"
                                    })}
                                    defaultValue={courseName}
                                    className="input input-bordered w-full border-2" />
                                {errors.courseName && <p className='text-red-600'>{errors.courseName?.message}</p>}
                            </div>

                            {/* Course Batch */}
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text font-bold">Batch Number</span>
                                </label>
                                <input
                                    type="number" {
                                    ...register("batchNumber", {
                                        required: "Number is required",
                                    })}
                                    defaultValue={batchNumber}
                                    className="input input-bordered w-full border-2"
                                />
                                {errors.batchNumber && <p className='text-red-600'>{errors.batchNumber?.message}</p>}
                            </div>
                        </div>

                        <div className=" grid grid-cols-3 gap-3">
                            {/* Registration Start Date */}
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text font-bold">Registration Start</span>
                                </label>
                                <input
                                    type="date" {
                                    ...register("registrationStartDate", {
                                        required: "Registration start date is required",
                                    })}
                                    defaultValue={registrationStartDate}
                                    className="input input-bordered w-full border-2"
                                />
                                {errors.registrationStartDate && <p className='text-red-600'>{errors.registrationStartDate?.message}</p>}
                            </div>

                            {/* Registration End Date */}
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text font-bold">Registration End</span>
                                </label>
                                <input
                                    type="date" {
                                    ...register("registrationEndDate", {
                                        required: "Registration end date is required",
                                    })}
                                    defaultValue={registrationEndDate}
                                    className="input input-bordered w-full border-2"
                                />
                                {errors.registrationEndDate && <p className='text-red-600'>{errors.registrationEndDate?.message}</p>}
                            </div>

                            {/* Course Start Date */}
                            <div className="form-control w-full mt-2">
                                <label className="label">
                                    <span className="label-text font-bold">Course Start</span>
                                </label>
                                <input
                                    type="date" {
                                    ...register("courseStartDate", {
                                        required: "Course start date is required",
                                    })}
                                    defaultValue={courseStartDate}
                                    className="input input-bordered w-full border-2"
                                />
                                {errors.courseStartDate && <p className='text-red-600'>{errors.courseStartDate?.message}</p>}
                            </div>
                        </div>

                        <div className=" grid grid-cols-3 gap-3">
                            {/* Course Duration */}
                            <div className="form-control w-full mt-2">
                                <label className="label font-bold">
                                    <span className="label-text">Course Duration (In months)</span>
                                </label>
                                <input
                                    type="number" {
                                    ...register("courseDurationInMonths", {
                                        required: "Course duration is required",
                                        // You can add additional validation rules here
                                    })}
                                    defaultValue={courseDurationInMonths}
                                    className="input input-bordered w-full border-2"
                                />
                                {errors.courseDurationInMonths && <p className='text-red-600'>{errors.courseDurationInMonths?.message}</p>}
                            </div>

                            {/* Select Instructor */}
                            <div className="form-control w-full mt-2">
                                <label className="label font-bold">
                                    <span className="label-text">Select Instructor</span>
                                </label>

                                <select
                                    {
                                    ...register("selectedInstructor", {
                                        required: "Instructor selection is required",
                                    })
                                    }
                                    defaultValue={selectedInstructor}
                                    className="select select-bordered w-full border-2"
                                >
                                    <option value="" disabled selected>Select an instructor</option>
                                    {
                                        !isLoading && instructors.map(instructor =>
                                            <option
                                                key={instructor._id}
                                                value={instructor._id}
                                            >{instructor.name}</option>)
                                    }
                                </select>

                                {errors.selectedInstructor && <p className='text-red-600'>{errors.selectedInstructor?.message}</p>}
                            </div>

                            {/* Course Fee */}
                            <div className="form-control w-full mt-2">
                                <label className="label font-bold">
                                    <span className="label-text">Course Fee (In Taka)</span>
                                </label>
                                <input
                                    type="number" {
                                    ...register("courseFee", {
                                        required: "Course Fee is required",
                                        // You can add additional validation rules here
                                    })}
                                    defaultValue={courseFee}
                                    className="input input-bordered w-full border-2"
                                />
                                {errors.courseFee && <p className='text-red-600'>{errors.courseFee?.message}</p>}
                            </div>
                        </div>

                        {/* Course Outline */}
                        {/* <div className="form-control w-full mt-2">
                        <label className="label">
                            <span className="label-text font-bold">Course Outline</span>
                        </label>
                        <textarea
                            {
                            ...register("courseOutline", {
                                required: "Course outline is required",
                            })
                            }
                            className="textarea textarea-bordered w-full h-32 border-2"
                        ></textarea>
                        {errors.courseOutline && <p className='text-red-600'>{errors.courseOutline?.message}</p>}
                    </div> */}


                        <>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">Text Content</span>
                                </label>
                                <Controller
                                    name="courseOutline"
                                    control={control}
                                    defaultValue={courseOutline}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            id="myTextarea"
                                            className="textarea textarea-bordered w-full border-2"
                                            rows="6"
                                            placeholder="Type your text here..."
                                            required="Course outline is required"

                                        />
                                    )}
                                />
                            </div>

                            <div className="form-control w-full max-w-md mt-4">
                                <label className="label">
                                    <span className="label-text">Text Formatting</span>
                                </label>
                                <div className="flex items-center mt-2">
                                    <button
                                        type="button"
                                        onClick={() => applyStyleToSelection('**')}
                                        className="btn btn-sm btn-secondary mr-2"
                                    >
                                        Bold
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyStyleToSelection('*')}
                                        className="btn btn-sm btn-secondary mr-2"
                                    >
                                        Italic
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyStyleToSelection('\n- ')}
                                        className="btn btn-sm btn-secondary"
                                    >
                                        Bullet Point
                                    </button>
                                </div>
                            </div>
                        </>

                        {/* Course Banner */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold">Course Banner</span>
                            </label>
                            <input
                                type="file"
                                {...register("courseBanner", {
                                    // required: "Course banner is required",
                                })}
                                // defaultValue={courseBanner}
                                className="input w-full"
                            />
                            {/* {errors.courseBanner && <p className='text-red-600'>{errors.courseBanner?.message}</p>} */}
                        </div>

                        <div className=" w-full max-w-xs mt-2">
                            <input className='btn btn-accent w-full' value="Update Course" type="submit" />
                        </div>

                    </form>
                </div>
            </div>

        </Modal>
    );
};

export default UpdateCourse;