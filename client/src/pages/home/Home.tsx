import WemeChat from "@/components/weme/WemeChat";
const Home = () => {
  return (
    <div className="h-[65vh]">
      <div className="flex items-center h-full border-b-4">
        <div className="w-full h-full bg-black border-r-4"></div>
        <div className="w-full h-full bg-gray-600"></div>
      </div>
      <div className="">
        <WemeChat />
      </div>
      <p className="pt-2 text-center">
        Copyright © 2023 WEME. All Right Reserved | Privacy
      </p>
    </div>
  );
};

export default Home;
