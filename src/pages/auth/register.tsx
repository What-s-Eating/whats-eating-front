import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import { Client } from "@/utils/fetcher";
import { checkEmail, checkPassword } from "@/utils/utils";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

interface RegisterProps {
  session?: Session
}

const Register: NextPage<RegisterProps> = ({ session }) => {
  const { update: updateSession } = useSession();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const handleRegister = async () => {
    if (name === "") {
      toast.error('이름을 입력해주세요.');
      return;
    }
    if (!checkEmail(email)) {
      toast.error('이메일 형식을 확인해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!checkPassword(password)) {
      toast.error('비밀번호는 8~20 자리이면서 1개 이상의 알파벳, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }

    try {
      const { data } = await Client.post('auth/signup', {
        name: name,
        email: email,
        password: password,
      });
      updateSession();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data?.message || '회원가입에 실패했습니다.');
      } else {
        toast.error('회원가입에 실패했습니다.');
      }
    }
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
              <div className="flex flex-col w-full">
                <span className="mb-1 font-bold text-sm">이름</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  placeholder="이름"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full mt-2">
                <span className="mb-1 font-bold text-sm">이메일</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  placeholder="이메일"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full mt-2">
                <span className="mb-1 font-bold text-sm">비밀번호</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  type="password"
                  placeholder="비밀번호"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full mt-2">
                <span className="mb-1 font-bold text-sm">비밀번호 확인</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  type="password"
                  placeholder="비밀번호"
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                  }}
                />
              </div>
              <Button
                variant="primary"
                className="w-full text-lg h-12 mt-6"
                onClick={handleRegister}
              >
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;