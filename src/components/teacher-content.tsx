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
      <div className="w-[788px] h-[688px] p-[78px_48px] bg-[url('/teacher.jpg')] text-[#471A00]">
        <div className="flex items-center">
          <div className="w-3 h-[52px] bg-[#FC5A01] "></div>
          <div className="flex-1 ml-[13px] text-[52px] leading-[73px] font-semibold">王依</div>
        </div>
        <div className="text-[26px] leading-[37px] font-medium mt-5">悦己中医经络瑜伽首席讲师</div>
        <div className="text-base leading-[30px] w-[312px] mt-[31px]">
        🌟GMAA国际孕产瑜伽高级指导师 <br />
🌟亚太国际瑜伽协会高级瑜伽导师 <br />
🌟多家知名企业特聘高级瑜伽导师 <br />
🌟深耕瑜伽二十多年，培养上千位瑜伽教练 <br />
🌟中医瑜伽“先行者”，学员超百万
        </div>
      </div>
      <VStack gap="20px" flex="1">
        <ShadowBox 
          title="中医经络瑜伽"
          description="根植于中国古代中医理论，沿用瑜伽体式，可以达到补养气血，舒缓疼痛，舒筋活血，改善睡眠，调整亚健康的目的。"
        />
        <ShadowBox 
          title="专为50岁以上女性设计"
          description="年纪大也轻松学，0基础也能轻松上手，动作柔缓不伤身。线上直播授课，一部手机就能上课，专业老师一对一指导，随时随地轻松学。"
        />
      </VStack>
    </HStack>
  )
}
