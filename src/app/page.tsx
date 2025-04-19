
import { Box } from "@chakra-ui/react";
import Hero from "@/components/hero";
import Course from "@/components/Course";
import TeacherContent from "@/components/teacher-content";
import StrategyContent from "@/components/strategy-content";
import SixDayContent from "@/components/sixday-content";




function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box width="1200px" alignItems="center" margin="0 auto" display="flex" flexDirection="column" gap="32px" >
      {children}
    </Box>
  )
}

export default function Home() {
  return (
    <Box width="100%" alignItems="center" >
      <Hero />
      <PageContainer>
        {/* <Course title="经络瑜伽" >
          <Image src="/yoga1.png" alt="经络瑜伽" height="335px" />
        </Course> */}
        <Course title="名师介绍" >
          <TeacherContent />
        </Course>
        <Course title="五脏六腑养生攻略" >
          <StrategyContent />
        </Course>
        <Course title="四天经络瑜伽调养营" >
          <SixDayContent />
        </Course>
      </PageContainer>
    </Box>
  );
}
