import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';

export default function Footer() {
  return (
    <div id="footer" className="w-full h-[150px] text-white bg-[#471A00] text-xs flex justify-center items-center mt-[92px]">
      <Flex w="700px" direction="row" justifyContent="space-between" alignItems="center" gap="70px">
        <VStack w="72px" alignItems="center">
          <Text>微信公众号</Text>
          <Image src="/QRcode.png" alt="qrcode" width={72} height={71} />
        </VStack>
        <Box w="600px" alignItems="left" flex={1}>
          <div className="float-left w-1/2 h-[25px] text-white">联系我们</div>
          <div className="float-left w-1/2 h-[25px] text-white">北京随心悦文化科技有限公司</div>
          <div className="float-left w-1/2 h-[25px] text-white">地址：北京市海淀区知春路6号锦秋国际</div>
          <div className="float-left w-1/2 h-[25px] text-white">www.suixinyue.cn</div>
          <div className="float-left w-1/2 h-[25px] text-white">邮箱：feedback.suixinyue.cn</div>
          <div className="float-left w-1/2 h-[25px] text-white">京ICP备2025108342号-1</div>
        </Box>
      </Flex>
    </div>
  )
}
