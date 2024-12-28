import { useForm } from "react-hook-form";

const FeedbackForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleFeedback = (data) => {
        console.log(data);
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Give Feedback</h2>
            <form onSubmit={handleSubmit(handleFeedback)}>
                <textarea
                    {
                    ...register("feedback", {
                        required: "Feedback is required",
                    })
                    }
                    className="textarea textarea-bordered w-full max-w-xs h-32"
                ></textarea>
                {errors.feedback && <p className='text-red-600'>{errors.feedback?.message}</p>}

                <div className=" mt-2">
                    <input className='btn btn-sm btn-info' value="Submit" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default FeedbackForm;