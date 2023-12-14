import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ClipLoader size={100} color="#ffffff" />
    </div>
  );
};

export default LoadingSpinner;
