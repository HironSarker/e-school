const CourseFeedback = () => {
    return (
        <div className=" border shadow-lg p-3 rounded mb-2">
            <p className=" text-sm font-semibold">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quos sit eveniet asperiores, repellat reiciendis fuga animi eius fugit voluptate aperiam labore, voluptatibus delectus quidem nesciunt voluptatem unde modi veniam?</p>

            <div className=" mt-6 flex space-x-3 items-center">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div>
                    <h2 className="text-sm font-extrabold">Prosenjit Kumar Pal</h2>
                    <h2 className="text-sm"><span>C Programming Language</span>, <span>Batch 10</span></h2>
                </div>
            </div>
        </div>
    );
};

export default CourseFeedback;