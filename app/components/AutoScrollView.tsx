import { useScrollToTop } from "@react-navigation/native"
import React, { useRef, useState } from "react"
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native"

interface BaseAutoScrollViewProps {
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>
  /**
   * Background color
   */
  backgroundColor?: string
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps
}

interface ScrollAutoScrollViewProps extends BaseAutoScrollViewProps {
  preset?: "scroll"
  /**
   * Should keyboard persist on view tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: "handled" | "always" | "never"
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  ScrollViewProps?: ScrollViewProps
}

interface AutoAutoScrollViewProps extends Omit<ScrollAutoScrollViewProps, "preset"> {
  preset?: "auto"
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number }
}

export type AutoScrollViewProps = AutoAutoScrollViewProps | ScrollAutoScrollViewProps

const isIos = Platform.OS === "ios"

function useAutoPreset(props: AutoAutoScrollViewProps) {
  const { preset, scrollEnabledToggleThreshold } = props
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {}

  const scrollViewHeight = useRef(null)
  const scrollViewContentHeight = useRef(null)
  const [scrollEnabled, setScrollEnabled] = useState(true)

  function updateScrollState() {
    if (scrollViewHeight.current === null || scrollViewContentHeight.current === null) return

    // check whether content fits the view then toggle scroll state according to it
    const contentFitsView = (function () {
      if (point) {
        return scrollViewContentHeight.current < scrollViewHeight.current - point
      } else {
        return scrollViewContentHeight.current < scrollViewHeight.current * percent
      }
    })()

    // content is less than the size of the view, so we can disable scrolling
    if (scrollEnabled && contentFitsView) setScrollEnabled(false)

    // content is greater than the size of the view, so let's enable scrolling
    if (!scrollEnabled && !contentFitsView) setScrollEnabled(true)
  }

  function onContentSizeChange(w: number, h: number) {
    // update scroll-view content height
    scrollViewContentHeight.current = h
    updateScrollState()
  }

  function onLayout(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout
    // update scroll-view  height
    scrollViewHeight.current = height
    updateScrollState()
  }

  // update scroll state on every render
  if (preset === "auto") updateScrollState()

  return {
    scrollEnabled: preset === "auto" ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  }
}

function ViewWithScrolling(props: AutoScrollViewProps) {
  const {
    children,
    keyboardShouldPersistTaps = "handled",
    contentContainerStyle,
    ScrollViewProps,
    style,
  } = props as ScrollAutoScrollViewProps

  const ref = useRef<ScrollView>()

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(props as AutoAutoScrollViewProps)

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref)

  return (
    <ScrollView
      {...{ keyboardShouldPersistTaps, scrollEnabled, ref }}
      {...ScrollViewProps}
      showsVerticalScrollIndicator={false}
      onLayout={(e) => {
        onLayout(e)
        ScrollViewProps?.onLayout?.(e)
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h)
        ScrollViewProps?.onContentSizeChange?.(w, h)
      }}
      style={[$outerStyle, ScrollViewProps?.style, style]}
      contentContainerStyle={[
        $innerStyle,
        ScrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  )
}

export function AutoScrollView(props: AutoScrollViewProps) {
  const {
    backgroundColor,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    preset = "auto"
  } = props

  return (
    <View style={[$containerStyle, { backgroundColor }]}>
      <KeyboardAvoidingView
        behavior={isIos ? "padding" : undefined}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[$keyboardAvoidingViewStyle, KeyboardAvoidingViewProps?.style]}
      >
        <ViewWithScrolling {...props} {...{ preset }} />
      </KeyboardAvoidingView>
    </View>
  )
}

const $containerStyle: ViewStyle = { flex: 1, height: "100%", width: "100%" }
const $outerStyle: ViewStyle = { flex: 1, height: "100%", width: "100%" }
const $innerStyle: ViewStyle = { justifyContent: "flex-start", alignItems: "stretch" }
const $keyboardAvoidingViewStyle: ViewStyle = { flex: 1 }
