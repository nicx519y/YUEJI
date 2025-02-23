"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ColorMode, ColorModeProvider } from "./color-mode"

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

interface ProviderProps {
  attribute?: string
  defaultTheme?: ColorMode  // 使用 ColorMode 类型
  children: React.ReactNode
}

export function Provider({ children, defaultTheme = "light", attribute = "class" }: ProviderProps) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider defaultTheme={defaultTheme} attribute={attribute}>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
