import React from "react"
import { Box, IHeadingProps } from "native-base";
import { translate } from "../../i18n"
import { EduBody, EduBodyProps } from "./Typography/EduBody";

type Presets = keyof typeof $presets

export interface TagProps extends IHeadingProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: EduBodyProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: EduBodyProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: EduBodyProps["txOptions"]
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /** 
   * Children components.
   */
  children?: React.ReactNode
}

export function Tag(props: TagProps) {
  const {
    tx,
    text,
    txOptions,
    children,
    ...rest
  } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children
  const preset: Presets = $presets[props.preset] ? props.preset : "h1"

  return (
    <Box
      // maxH='6'
      // maxHeight="8"
      // accessibilityLabel={tag}
      padding='1'
      paddingLeft='2'
      paddingRight='2'
      borderRadius="lg"
      backgroundColor="rgba(51, 94, 247, 0.08)"
      {...rest}
    >
      <EduBody
        sizeT="xs"
        type="semibold"
        alignSelf="center"
        color="primary.500"
        numberOfLines={1}
        children={content}
      />
    </Box>
  )

}

const $baseStyle: IHeadingProps = {
  fontWeight: "bold",
}

const $presets = {
  // Heading 1 / Bold / 48px 5xl
  h1: { ...$baseStyle, fontSize: "5xl" } as IHeadingProps,

  // Heading 2 / Bold / 40px 4xl (36) // TODO: 
  h2: { ...$baseStyle, fontSize: "4xl" } as IHeadingProps,

  // Heading 3 / Bold / 32px 3xl (30) // TODO: 
  h3: { ...$baseStyle, fontSize: "3xl" } as IHeadingProps,

  // Heading 4 / Bold / 24px 2xl
  h4: { ...$baseStyle, fontSize: "2xl" } as IHeadingProps,
  // h4:  { fontSize: "2xl", lineHeight: "2xl" }] as IHeadingProps,

  // Heading 5 / Bold / 20px xl
  h5: { ...$baseStyle, fontSize: "xl" } as IHeadingProps,

  // Heading 6 / Bold / 18px lg
  h6: { ...$baseStyle, fontSize: "lg" } as IHeadingProps,
}




