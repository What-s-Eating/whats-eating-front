import Input from "@/components/Input";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async () => {
    await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    }).then(async res => {
      if (res?.ok) {
        const session = await updateSession();
        router.push((router.query.redirect as string) || "/");
      } else {
        toast.error("로그인에 실패했습니다.");
      }
    });
  };

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
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="relative w-full">
                <i className="fas fa-lock text-base absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-700" />
                <Input
                  variant="primary"
                  className="mx-auto w-full pl-10 rounded-tr-none rounded-tl-none h-10"
                  type={showPassword ? "text" : "password"}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
                <i
                  className="fas fa-eye-slash text-sm absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-700"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              </div>
              <Button
                variant="primary"
                className="w-full text-lg h-12 mt-6"
                onClick={handleLogin}
              >
                로그인
              </Button>

              {/* <button className="w-full bg-[#FEE500] h-10 rounded-lg flex items-center justify-center relative mt-10">
                <img
                  src="/icons/kakao-login-symbol.png"
                  alt="kakao"
                  className="w-5 h-5 absolute left-4"
                />
                <span className="text-black text-sm font-bold text-center">
                  카카오로 로그인
                </span>
              </button> */}
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
