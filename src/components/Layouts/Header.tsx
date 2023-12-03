import Image from "next/image";
import Logo from "@/../public/logo.svg";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { debounce } from "lodash";
import { useRouter } from "next/router";

const Header = () => {
  const { data: session, update: updateSession } = useSession();
  const [onHover, setOnHover] = useState<boolean>(false);
  const router = useRouter();

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
        <div
          className="flex flex-row"
          onMouseEnter={() => {
            setOnHover(true);
          }}
          onMouseLeave={() => {
            setOnHover(false);
          }}
        >
          {session ? (
            <>
              <div className="flex flex-row items-center relative">
                <div className="flex flex-row items-center">
                  <Image
                    src={
                      session.user.user.profileImage
                        ? session.user.user.profileImage
                        : "/default-profile.png"
                    }
                    alt="profile"
                    width={35}
                    height={35}
                    className="rounded-full border"
                  />
                  <span className="text-lg font-bold ml-3">
                    {session.user.user.name}
                  </span>
                </div>
                {onHover && (
                  <div className="absolute top-8 right-0 bg-white border rounded-md shadow-md w-[7.5rem]">
                    <button
                      className="flex flex-row w-full items-center justify-between px-3 py-2 hover:bg-gray-100"
                      onClick={async () => {
                        await signOut({
                          callbackUrl: router.asPath,
                        });
                      }}
                    >
                      <i className="fas fa-user text-lg text-gray-700 mr-3" />
                      <span className="text-base text-gray-700">로그아웃</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="mx-auto text-lg px-3 border border-gray-500 hover:border-gray-600 hover:bg-gray-100 text-black ring-0 rounded-md py-1"
              >
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
