'use client'

import { Center, HStack, Image, Text, VStack } from "@chakra-ui/react";
import styled from "styled-components";

const HeroContainer = styled.div`
  width: 1920px;
  height: 550px;
  background-color: #F0E6DB;
  background-image: url('/hero.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const WeChatContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 99px;
  padding: 14px 11px;
  position: absolute;
  left: 447px;
  top: 376px;
  background-color: white;
`;

const WeChatBtn = styled.div`
  width: 109px;
  height: 32px;
  font-size: 14px;
  color: white;
  background-color: #24DB5A;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;



export default function Hero() {
    return (
        <Center height="550px" >
            <HeroContainer>
                <Image src="/slogen.png" alt="悦健康，悦自在" width="355px" height="180px" left="450px" top="95px" position="absolute" />
                <WeChatContainer>
                    <Image src="/QRcode.png" alt="微信搜索" width="72px" height="71px" />
                    <VStack flex={1} gap={1} >
                        <HStack>
                            <Image src="/wechat.png" alt="微信搜索" width="31px" height="25px" />
                            <Text fontSize="18px"  color="#471A00">微信搜索</Text>
                        </HStack>
                        <WeChatBtn>悦己经络瑜伽</WeChatBtn>
                    </VStack>
                </WeChatContainer>
            </HeroContainer>
        </Center>
    )
}
