import React from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  size?: number;
  status?: string;
  initial?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 20,
  status,
  initial,
  bgColor,
  textColor,
  borderColor,
  className = "",
}) => {
  const baseSize = `size-${size}`;
  const textSize = String(Math.ceil(size / 8));

  return (
    <div className={`relative ${className}`}>
      {src ? (
        <Image
          alt=""
          className={`${baseSize} rounded-full`}
          src={src}
          width={size}
          height={size}
        />
      ) : (
        <div
          className={`${baseSize} rounded-full inline-flex items-center justify-center text-${textSize}xl font-semibold border ${borderColor} ${bgColor} ${textColor}`}
        >
          {initial}
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-2 right-2 transform translate-y-1/2 size-2.5 rounded-full ring-2 ring-light ${
            status === "success"
              ? "bg-success"
              : status === "gray"
              ? "bg-gray-400"
              : ""
          }`}
        ></span>
      )}
    </div>
  );
};

export default Avatar;
