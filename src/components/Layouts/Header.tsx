import Image from "next/image";
import Logo from "@/../public/logo.svg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-white border-b fixed top-0 w-full z-10">
      <div className="flex flex-row items-center py-3 max-w-screen-2xl mx-auto px-5">
        <Link
          href="/"
          className="flex flex-row items-center justify-center mr-auto"
        >
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
        </Link>
        <div className="flex flex-row">
          <Link
            href="/auth/login"
            className="mx-auto text-lg px-3 border border-gray-500 hover:border-gray-600 hover:bg-gray-100 text-black ring-0 rounded-md py-1"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
