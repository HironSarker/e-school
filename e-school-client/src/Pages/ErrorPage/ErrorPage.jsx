import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div
        className="h-[100vh] bg-cover bg-center flex flex-wrap justify-center items-center"
        style={{
          backgroundImage:
            "url('https://cdn.schoolism.com/storage/assets/images/error_bg.png') ",
        }}
      >
        <div className="self-center text-center uppercase p-5 space-y-6">
          <h1 className="text-base-100 text-9xl">404</h1>
          <p className="text-base-100 text-4xl leading-relaxed">
            we are sorry <br /> this page doesn&apos;t exist
          </p>
          <div className="text-center">
            <Link to="/">
              <button className="btn btn-success text-white">
                Go Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
