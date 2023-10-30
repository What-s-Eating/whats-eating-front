import Image from "next/image";

const Header = () => {
  return (
    <div className="bg-white border-b">
      <div className="flex flex-row items-center py-3 max-w-screen-2xl mx-auto px-5">
        <Image src="/logo.svg" alt="logo" width={40} height={40} layout="responsive" className="max-w-[40px]" />
        <span
          style={{
            fontFamily: "Soyo Maple",
          }}
          className="text-xl lg:block hidden font-bold ml-2"
        >
          뭐 먹으러가?
        </span>
      </div>
      
    </div>
  );
};

export default Header;
