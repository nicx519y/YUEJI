import { HStack } from "@chakra-ui/react";

function StrategyCard({ width, height, image, title, description = "", marginTop = "222px", textAlign = "left" }: {
  width: string;
  height: string;
  image: string; 
  title: string;
  description?: string;
  marginTop?: string;
  textAlign?: "left" | "center";
}) {
  return (
    <div 
      style={{ backgroundImage: `url(${image})`, borderRadius: "8px", lineHeight: "22px", width: `${width}`, height: `${height}`, backgroundSize: "cover" }}
    >
      <div 
        className={`text-white text-lg leading-[18px] font-semibold px-4`}
        style={{ marginTop, textAlign }}
      >
        {title}
        {description && (
          <div className="text-white text-sm font-normal py-2">
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StrategyContent() {
  return (
    <HStack gap="20px">
      <StrategyCard width="500px" height="280px" image="/yoga-pic1.jpg" title="主心脏" description="调理气血，身心愉悦" />
      <StrategyCard width="155px" height="280px" image="/yoga-pic2.jpg" title="主气脉" marginTop="246px" textAlign="center" />
      <StrategyCard width="155px" height="280px" image="/yoga-pic3.jpg" title="主运化" marginTop="246px" textAlign="center" />
      <StrategyCard width="155px" height="280px" image="/yoga-pic4.jpg" title="主疏通" marginTop="246px" textAlign="center" />
      <StrategyCard width="155px" height="280px" image="/yoga-pic5.jpg" title="主身心" marginTop="246px" textAlign="center" />
    </HStack>
  )
}
