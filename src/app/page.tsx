'use client'

import { Box, Image } from "@chakra-ui/react";
import Hero from "@/components/hero";
import Course from "@/components/Course";
import styled from "styled-components";
import TeacherContent from "@/components/teacher-content";
import StrategyContent from "@/components/strategy-content";
import SixDayContent from "@/components/sixday-content";


const PageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default function Home() {
  return (
    <Box width="100%" alignItems="center" >
      <Hero />
      <PageContainer>
        <Course title="经络瑜伽" >
          <Image src="/yoga1.png" alt="经络瑜伽" height="335px" />
        </Course>
        <Course title="名师介绍" >
          <TeacherContent />
        </Course>
        <Course title="五脏六腑养生攻略" >
          <StrategyContent />
        </Course>
        <Course title="六天经络瑜伽营" >
          <SixDayContent />
        </Course>
      </PageContainer>
    </Box>
  );
}
