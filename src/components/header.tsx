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
                        width={93}
                        height={36}
                        priority
                    />
                </Link>

                <Box className="flex items-center space-x-6" flex={1} justifyContent="flex-end" >
                    <div className="hidden md:flex items-center space-x-[56px] size-18">
                        <Link
                            href="#"
                            className="text-[#471A00] text-[18px] font-weight-[400] hover:text-[#FC5A01] transition-colors"
                        >
                            首页
                        </Link>
                        <Link
                            href="#footer"
                            className="text-[#471A00] text-[18px] font-weight-[400] hover:text-[#FC5A01] transition-colors"
                        >
                            联系我们
                        </Link>
                    </div>
                </Box>
            </Flex>
        </Center>
    )
}
