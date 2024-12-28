import AllCoursesBanner from '../../../assets/images/AllCourseBanner.jpg';

const AllCoursesBannerImg = () => {
    return (
        <div>
            <div className=' relative'>
                <img src={AllCoursesBanner} alt="" className=' w-full h-44' />
                <div className=' absolute inset-0 left-10 top-10 text-black space-y-3'>
                    <h2 className=' text-3xl font-bold'>LEARN FROM PROFESSIONALS</h2>
                    <p>Online courses are planned by industry professionals to make sure that you have the knowledge to build professional software</p>
                </div>
            </div>
        </div>
    );
};

export default AllCoursesBannerImg;