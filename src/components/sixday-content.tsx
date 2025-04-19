import { HStack, Image } from "@chakra-ui/react";

function ShadowCard({ image, title }: { image: string; title: string }) {
  return (
    <div className="w-[386px] h-[266px] bg-gradient-to-b from-[#F4F8FE] to-white shadow-[10px_10px_16px_0px_rgba(22,30,87,0.06),4px_4px_8px_0px_rgba(0,0,0,0.03)] rounded-lg">
      <Image src={image} alt={title} height="218px" borderRadius="8px 8px 0 0" />
      <div className="h-12 leading-[48px] px-5 font-[PingFangSC] font-medium text-lg text-[#471A00] text-left">
        {title}
      </div>
    </div>
  );
}

export default function SixDayContent() {
  return (
    <HStack gap="20px">
      <ShadowCard image="/yoga-pic6.jpg" title="疏通肩颈疼痛" />
      <ShadowCard image="/yoga-pic7.jpg" title="缓解腰膝酸软" />
      <ShadowCard image="/yoga-pic8.jpg" title="安神助眠睡好觉" />
    </HStack>
  )
}
