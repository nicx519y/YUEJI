import Image from 'next/image'
import Link from 'next/link'
import { Box, Center, Flex } from '@chakra-ui/react'

export default function Header() {
    return (
        <Center w="100%">
            <Flex w="1200px" direction="row" h="60px" alignItems="center" justifyContent="space-between" >
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="悦己"
                        width={110}
                        height={43}
                        priority
                    />
                </Link>

                <Box className="flex items-center space-x-6" flex={1} justifyContent="flex-end" >
                    <div className="hidden md:flex items-center space-x-[56px]">
                        <Link
                            href="#"
                            className="text-[#471A00] text-[18px] font-normal hover:text-[#FC5A01] transition-colors border-b-2 border-[#FC5A01] pb-[5px] pt-[5px]"
                        >
                            首页
                        </Link>
                        <Link
                            href="#footer"
                            className="text-[#471A00] text-[18px] font-normal hover:text-[#FC5A01] transition-colors border-b-2 border-[#ffffff] pb-[5px] pt-[5px]"
                        >
                            联系我们
                        </Link>
                    </div>
                </Box>
            </Flex>
        </Center>
    )
}
