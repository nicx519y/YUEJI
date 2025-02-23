import { HStack, Image } from "@chakra-ui/react";
import styled from "styled-components";

const ShadowContainer = styled.div`
    width: 386px;
    height: 266px;
    background: linear-gradient( 180deg, #F4F8FE 0%, #FFFFFF 100%);
    box-shadow: 10px 10px 16px 0px rgba(22,30,87,0.06), 4px 4px 8px 0px rgba(0,0,0,0.03);
    border-radius: 8px;
`;

const ShadowContainerTitle = styled.div`
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 18px;
    color: #471A00;
    text-align: left;
    font-style: normal;

`;

export default function SixDayContent() {
    return (
        <HStack gap="20px">
            <ShadowContainer>
                <Image src="/yoga-pic6.png" alt="调理肩颈问题" height="218px" />
                <ShadowContainerTitle>调理肩颈问题</ShadowContainerTitle>
            </ShadowContainer>
            <ShadowContainer>
                <Image src="/yoga-pic7.png" alt="调理腰腿问题" height="218px" />
                <ShadowContainerTitle>调理腰腿问题</ShadowContainerTitle>
            </ShadowContainer>
            <ShadowContainer>
                <Image src="/yoga-pic8.png" alt="调理睡眠问题" height="218px" />
                <ShadowContainerTitle>调理睡眠问题</ShadowContainerTitle>
            </ShadowContainer>
        </HStack>
    )
}
