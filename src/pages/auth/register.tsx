import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import { Client } from "@/utils/fetcher";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      toast.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    // check email
    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email) === false) {
      toast.error("이메일 형식이 올바르지 않습니다.");
      return;
    }

    // check password
    if (
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password) ===
      false
    ) {
      toast.error(
        "비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다."
      );
      return;
    }

    try {
      await Client.post("/auth/signup", {
        email,
        password,
        name,
      });
      toast.success("회원가입에 성공했습니다.");

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then(async res => {
        if (res?.ok) {
          const session = await updateSession();
          router.push((router.query.redirect as string) || "/");
        } else {
          toast.error("로그인에 실패했습니다.");
        }
      });
    } catch (error: any) {
      toast.error(error.response.data.message || "회원가입에 실패했습니다.");
      return;
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center px-[40px] lg:w-[460px] mx-auto"
        >
          <div className="border w-full h-full rounded-md">
            <div className="px-[20px] py-[28px] items-center flex flex-col">
              <div className="flex flex-col w-full">
                <span className="mb-1 font-bold text-sm">이름</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  placeholder="이름"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col w-full mt-2">
                <span className="mb-1 font-bold text-sm">이메일</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  placeholder="이메일"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col w-full mt-2">
                <span className="mb-1 font-bold text-sm">비밀번호</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  type="password"
                  placeholder="비밀번호"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col w-full mt-2">
                <span className="mb-1 font-bold text-sm">비밀번호 확인</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  type="password"
                  placeholder="비밀번호"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPasswordCheck(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <Button variant="primary" className="mt-4 w-full h-10" type="submit">
            회원가입
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;
