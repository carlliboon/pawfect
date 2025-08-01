import Image from "next/image";
import loader from "@/assets/loader.gif";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Image
        src={loader}
        alt="Loading..."
        className="w-[150px] h-auto mx-auto"
        priority
      />
    </div>
  );
};

export default LoadingPage;
