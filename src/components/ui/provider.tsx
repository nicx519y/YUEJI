"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

import {
  ColorModeProviderProps,
  ColorModeProvider,
} from "@/components/ui/color-mode"

// 定义主题配置
const theme = {
  ...defaultSystem,
  styles: {
    global: {
      body: {
        fontFamily: 'Arial, Helvetica, sans-serif',
      }
    }
  },
  fonts: {
    body: 'Arial, Helvetica, sans-serif',
    heading: 'Arial, Helvetica, sans-serif',
    mono: 'monospace',
    icomoon: 'icomoon, Arial, sans-serif'
  }
};

export function Provider(props: ColorModeProviderProps) {


  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
