import { Heading } from "@chakra-ui/react";

export default function Course({
  title,
  children
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[50px] text-[22px] font-semibold text-[#471A00] flex flex-row gap-2 items-center justify-center">
        <div className="w-1 h-5 bg-[#FC5A01] inline-block mt-0.5"></div>
        <Heading as="h2" fontSize="22px" fontWeight="600" color="#471A00" flex={1} lineHeight="22px">
          {title}
        </Heading>
      </div>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
} 