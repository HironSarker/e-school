import { useForm, Controller } from 'react-hook-form';

const CourseMaterialForm = () => {

    const { handleSubmit, control, setValue, getValues } = useForm();

    const applyStyleToSelection = (style) => {
        const textarea = document.getElementById('myTextarea');
        const { selectionStart, selectionEnd } = textarea;

        const currentValue = getValues('textContent');

        const prefix = currentValue.substring(0, selectionStart);
        const selectedText = currentValue.substring(selectionStart, selectionEnd);
        const suffix = currentValue.substring(selectionEnd);

        // Apply the style to the selected text
        const styledText = `${style}${selectedText}${style}`;

        // Update the textarea with the modified text
        setValue('textContent', `${prefix}${styledText}${suffix}`);

        // Adjust the selection to cover the newly applied styled text
        textarea.setSelectionRange(
            selectionStart + style.length,
            selectionEnd + style.length
        );
    };

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission logic here
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-md">
                    <label className="label">
                        <span className="label-text">Text Content</span>
                    </label>
                    <Controller
                        name="textContent"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                id="myTextarea"
                                className="textarea textarea-bordered w-full max-w-md"
                                rows="6"
                                placeholder="Type your text here..."
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

                <div className="form-control w-full max-w-md mt-4">
                    <button type="submit" className="btn btn-primary w-full max-w-md">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseMaterialForm;