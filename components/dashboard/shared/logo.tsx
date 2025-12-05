import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 220, height = 40 }) => {
  return (
    <Image src="/images/logo.png" alt="Logo" width={width} height={height} />
  );
};

export default Logo;
