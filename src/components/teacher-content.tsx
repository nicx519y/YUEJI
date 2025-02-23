import { VStack, HStack } from "@chakra-ui/react";
import styled from "styled-components";
const ShadowContainer = styled.div`
  height: 334px;
  background-color: #fff;
  color: #333;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 36px;
`;

const ShadowContentTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

const ShadowContentDescription = styled.div`
  color: #333;
  font-size: 16px;
  line-height: 32px;
`;

const ShadowContentLine = styled.div`
  width: 50px;
  height: 8px;
  background-color: #FC5A01;
  margin: 23px 0 37px 0;
`;

const TeacherImageContainer = styled.div`
  width: 788px;
  height: 688px;
  padding: 78px 48px;
  background-image: url("/teacher.png");
  color: #471A00;
`;

const TeacherImageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 52px;
  line-height: 73px;
  font-weight: 600;
`;

const TeacherImageSubTitle = styled.div`
  font-size: 26px;
  line-height: 37px;
  font-weight: 500;
  margin-top: 20px;
`;

const TeacherImageDescription = styled.div`
  font-size: 16px;
  line-height: 30px;
  width: 312px;
  margin-top: 31px;
`;

const TeacherImageTitleIcon = styled.div`
  width: 12px;
  height: 52px;
  background: #FC5A01;
`;

const TeacherImageTitleLabel = styled.div`
  flex:1;
  margin-left: 13px;
  font-size: 52px;
  line-height: 73px;
  font-weight: 600;
`;

export default function TeacherContent() {
    return (
        <HStack gap="20px" >
            <TeacherImageContainer>
                <TeacherImageTitle><TeacherImageTitleIcon /><TeacherImageTitleLabel>杨璇</TeacherImageTitleLabel></TeacherImageTitle>
                <TeacherImageSubTitle>八年经络瑜伽讲师</TeacherImageSubTitle>
                <TeacherImageDescription>瑜伽对身体有减肥塑形、提升能量水平、消除疲劳等好处。建议在日常生活中适当做瑜伽运动来锻炼身体，提高身体素质。</TeacherImageDescription>
            </TeacherImageContainer>
            <VStack gap="20px" flex="1" >
                <ShadowContainer>
                    <ShadowContentTitle>养生瑜伽</ShadowContentTitle>
                <ShadowContentLine />
                <ShadowContentDescription>瑜伽是一项有着5000年历史的关于身体、心理以及精神的练习，起源于印度，其目的是改善身体和心性。2014年12月11日，联大宣布6月21日为国际瑜伽日，2015年举办了首届6.21国际瑜伽日。</ShadowContentDescription>
            </ShadowContainer>
            <ShadowContainer>
                <ShadowContentTitle>修心养身</ShadowContentTitle>
                <ShadowContentLine />
                <ShadowContentDescription>瑜伽姿势运用古老而易于掌握的技巧，改善人们生理、心理、情感和精神方面的能力，是一种达到身体、心灵与精神和谐统一的运动方式，包括调身的体位法、调息的呼吸法、调心的冥想法等，以达至身心的合一。</ShadowContentDescription>
            </ShadowContainer>
        </VStack>
        </HStack>
    )
}
