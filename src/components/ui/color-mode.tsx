"use client"

import { createContext, useContext, useState } from "react"
import type { SpanProps } from "@chakra-ui/react"
import { Span } from "@chakra-ui/react"
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"

export type ColorMode = "light" | "dark" | "system"

export type ColorModeProviderProps = {
  attribute?: string
  defaultTheme?: ColorMode
  children?: React.ReactNode
}

const ColorModeContext = createContext<{
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
} | null>(null)

export function ColorModeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
}: ColorModeProviderProps) {
  const [colorMode, setColorMode] = useState<ColorMode>(defaultTheme)

  const value = {
    colorMode,
    setColorMode: (colorMode: ColorMode) => {
      setColorMode(colorMode)
      const root = window.document.documentElement
      root.setAttribute(attribute, colorMode)
    },
  }

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  )
}

export function useColorMode() {
  const context = useContext(ColorModeContext)
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider")
  }
  return context
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

export function ColorModeButton() {
  const { colorMode, setColorMode } = useColorMode()

  return (
    <button
      onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
    >
      {colorMode === "light" ? "🌙" : "☀️"}
    </button>
  )
}

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        colorScheme="light"
        ref={ref}
        {...props}
      />
    )
  },
)

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function DarkMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme dark"
        colorPalette="gray"
        colorScheme="dark"
        ref={ref}
        {...props}
      />
    )
  },
)
