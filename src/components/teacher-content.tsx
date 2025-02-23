import { VStack, HStack } from "@chakra-ui/react";

function ShadowBox({ title, description }: { title: string; description: string }) {
  return (
    <div className="h-[334px] bg-white text-[#333] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] p-9">
      <div className="text-[28px] font-semibold">{title}</div>
      <div className="w-[50px] h-2 bg-[#FC5A01] m-[23px_0_37px_0]"></div>
      <div className="text-[#333] text-base leading-8">{description}</div>
    </div>
  );
}

export default function TeacherContent() {
  return (
    <HStack gap="20px">
      <div className="w-[788px] h-[688px] p-[78px_48px] bg-[url('/teacher.png')] text-[#471A00]">
        <div className="flex items-center">
          <div className="w-3 h-[52px] bg-[#FC5A01] "></div>
          <div className="flex-1 ml-[13px] text-[52px] leading-[73px] font-semibold">杨璇</div>
        </div>
        <div className="text-[26px] leading-[37px] font-medium mt-5">八年经络瑜伽讲师</div>
        <div className="text-base leading-[30px] w-[312px] mt-[31px]">
          瑜伽对身体有减肥塑形、提升能量水平、消除疲劳等好处。建议在日常生活中适当做瑜伽运动来锻炼身体，提高身体素质。
        </div>
      </div>
      <VStack gap="20px" flex="1">
        <ShadowBox 
          title="养生瑜伽"
          description="瑜伽是一项有着5000年历史的关于身体、心理以及精神的练习，起源于印度，其目的是改善身体和心性。2014年12月11日，联大宣布6月21日为国际瑜伽日，2015年举办了首届6.21国际瑜伽日。"
        />
        <ShadowBox 
          title="修心养身"
          description="瑜伽姿势运用古老而易于掌握的技巧，改善人们生理、心理、情感和精神方面的能力，是一种达到身体、心灵与精神和谐统一的运动方式，包括调身的体位法、调息的呼吸法、调心的冥想法等，以达至身心的合一。"
        />
      </VStack>
    </HStack>
  )
}
