import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 size={100} color="#ffffff" className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
