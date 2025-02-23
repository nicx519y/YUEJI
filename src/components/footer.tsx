'use client'

import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import styled from "styled-components";

const FooterContainer = styled.div.attrs({
    id: 'footer'
})`
    width: 100%;
    height: 150px;
    color: white;
    background-color: #471A00;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 92px;
`;

const TextField = styled.div`
    float: left;
    width: 50%;
    height: 25px;
    color: white;
    background-color: #471A00;
`;



export default function Footer() {
  return (
    <FooterContainer  >
        <Flex w="700px" direction="row" justifyContent="space-between" alignItems="center" gap="70px" >
            <VStack w="72px" alignItems="center">
                <Text>微信公众号</Text>
                <Image src="/QRcode.png" alt="qrcode" width={72} height={71} />
            </VStack>
            <Box w="600px" alignItems="left" flex={1} >
                <TextField>联系我们</TextField>
                <TextField>北京随心悦文化科技有限公司</TextField>
                <TextField>地址：北京市海淀区知春路6号锦秋国际</TextField>
                <TextField>www.suixinyue.cn</TextField>
                <TextField>邮箱：feedback.suixinyue.cn</TextField>
                <TextField>京ICP备2025108342号-1</TextField>
            </Box>
        </Flex>
    </FooterContainer>
  )
}
