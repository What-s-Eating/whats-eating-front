import Link from "next/link";
import Image from "next/image";
import LogoImage from "@/../public/logo.svg";
import React from "react";
import { classNames } from "@/utils/utils";

interface LogoProps {
  fontClassName?: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  fontClassName,
  imageClassName,
  className,
  imageHeight,
  imageWidth,
}) => {
  return (
    <Link
      href="/"
      className={classNames(
        "flex flex-row items-center justify-center",
        className
      )}
    >
      <Image
        src={LogoImage}
        alt="logo"
        width={imageWidth ?? 35}
        height={imageHeight ?? 35}
        className={classNames(imageClassName, "max-w-[40px]")}
      />
      <span
        style={{
          fontFamily: "Soyo Maple",
        }}
        className={classNames(fontClassName, "text-xl font-bold ml-2")}
      >
        뭐 먹으러가?
      </span>
    </Link>
  );
};

export default Logo;
