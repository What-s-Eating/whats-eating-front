import Input from "@/components/Input";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import Button from "@/components/Button";

const Login = () => {
  return (
    <>
      <div className="h-[100vh]">
        <Logo
          imageHeight={60}
          imageWidth={60}
          imageClassName="lg:max-w-[60px] max-w-[40px]"
          fontClassName="lg:text-[28px] text-[20px] ml-4"
          className="pb-[48px] mt-[108px]"
        />
        <div className="flex flex-col items-center justify-center px-[40px] lg:w-[460px] mx-auto">
          <div className="border w-full h-full rounded-md">
            <div className="px-[20px] py-[28px] items-center flex flex-col">
              <div className="relative w-full">
                <i className="fas fa-user text-base absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-700" />
                <Input
                  variant="primary"
                  className="mx-auto w-full pl-10 rounded-br-none rounded-bl-none h-10"
                />
              </div>
              <div className="relative w-full">
                <i className="fas fa-lock text-base absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-700" />
                <Input
                  variant="primary"
                  className="mx-auto w-full pl-10 rounded-tr-none rounded-tl-none h-10"
                />
                <i className="fas fa-eye-slash text-sm absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700" />
              </div>
              <Button variant="primary" className="w-full text-lg h-12 mt-6">
                로그인
              </Button>
            </div>
          </div>
          <div className="flex flex-row">
            <Link
              href="/auth/register"
              className="text-gray-500 text-sm mt-5 hover:underline"
            >
              회원가입
            </Link>
            <span className="text-gray-500 text-sm mt-5 mx-2">|</span>
            <Link
              href="/auth/password-reset"
              className="text-gray-500 text-sm mt-5 hover:underline"
            >
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
