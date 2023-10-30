import Image from "next/image";
import Logo from "@/../public/logo.svg";
import Button from "../Button";

const Header = () => {
  return (
    <div className="bg-white border-b">
      <div className="flex flex-row items-center py-3 max-w-screen-2xl mx-auto px-5">
        <div className="flex flex-row items-center justify-center mr-auto">
          <Image
            src={Logo}
            alt="logo"
            width={35}
            height={35}
            className="max-w-[40px]"
          />
          <span
            style={{
              fontFamily: "Soyo Maple",
            }}
            className="text-xl lg:block hidden font-bold ml-2"
          >
            뭐 먹으러가?
          </span>
        </div>
        <div className="flex flex-row">
          <Button variant="primary" className="mx-auto">
            asd
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
