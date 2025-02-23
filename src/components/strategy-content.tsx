import { HStack } from "@chakra-ui/react";

function StrategyCard({ image, title, marginTop = "222px", textAlign = "left" }: { 
  image: string; 
  title: string;
  marginTop?: string;
  textAlign?: "left" | "center";
}) {
  return (
    <div 
      className={`${image === "/yoga-pic1.png" ? "w-[500px]" : "w-[155px]"} h-[280px] bg-cover`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div 
        className={`text-white text-lg leading-[18px] font-semibold px-4`}
        style={{ marginTop, textAlign }}
      >
        {title}
      </div>
    </div>
  );
}

export default function StrategyContent() {
  return (
    <HStack gap="20px">
      <StrategyCard image="/yoga-pic1.png" title="主心脏" />
      <StrategyCard image="/yoga-pic2.png" title="主气脉" marginTop="246px" textAlign="center" />
      <StrategyCard image="/yoga-pic3.png" title="主运化" marginTop="246px" textAlign="center" />
      <StrategyCard image="/yoga-pic4.png" title="主疏通" marginTop="246px" textAlign="center" />
      <StrategyCard image="/yoga-pic5.png" title="主身心" marginTop="246px" textAlign="center" />
    </HStack>
  )
}
