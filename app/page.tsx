import Image from "next/image";
import MainUI from "./components/MainUI";

export default function Home() {
  return (
    <div className="w-2/3  min-w-[600px] flex flex-col items-center mx-auto h-screen">
      <h1 className="font-bold text-4xl mt-20 mb-10">TODO LIST</h1>
      <MainUI/>
    </div>
  );
}
