import { Center, HStack, Image, Text, VStack } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Center height="550px" className="bg-[url('/hero.jpg')] bg-cover bg-center max-w-[1920px] min-w-[1200px] mx-auto" >
      <div className="min-w-[1200px] w-[1200px] h-[550px] flex justify-center items-center relative">
        <Image 
          src="/slogen.png" 
          alt="悦健康，悦自在" 
          width="355px" 
          height="180px" 
          left="90px" 
          top="95px" 
          position="absolute" 
        />
        <div className="flex flex-row items-center justify-center w-[220px] h-[99px] p-[14px_11px] absolute left-[87px] top-[376px] bg-white">
          <Image src="/QRcode.png" alt="微信搜索" width="72px" height="71px" />
          <VStack flex={1} gap={1}>
            <HStack>
              <Image src="/wechat.png" alt="微信搜索" width="31px" height="25px" />
              <Text fontSize="18px" color="#471A00">微信搜索</Text>
            </HStack>
            <div className="w-[109px] h-8 text-sm text-white bg-[#24DB5A] flex items-center justify-center rounded-md">
              悦己经络瑜伽
            </div>
          </VStack>
        </div>
      </div>
    </Center>
  )
}
