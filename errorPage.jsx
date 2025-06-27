import logo from "./src/assets/iDEAL-logo.jpg";

const ErrorPage = () => {
  return (
    <div className="w-[70vw] min-h-[60vh] flex flex-col items-center justify-center mx-auto">
      <h1 className="text-center text-blue-600 text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
        Coming soon!!!
      </h1>
      <div className="flex justify-center">
        <img
          className="max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] h-auto"  
          src={logo}
          alt="ideal-logo"
        />
      </div>
    </div>
  );
};

export default ErrorPage;