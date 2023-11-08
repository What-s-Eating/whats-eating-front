import Input from "@/components/Input";
import Logo from "@/components/Logo";

const Register = () => {
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
                <span className="mb-1 font-bold text-sm">아이디</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  placeholder="아이디"
                />
              </div>
              <div className="flex flex-col w-full mt-2">
                <span className="mb-1 font-bold text-sm">비밀번호</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  type="password"
                  placeholder="비밀번호"
                />
              </div>
              <div className="flex flex-col w-full mt-2">
                <span className="mb-1 font-bold text-sm">비밀번호 확인</span>
                <Input
                  variant="primary"
                  className="mx-auto w-full h-10"
                  type="password"
                  placeholder="비밀번호"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
