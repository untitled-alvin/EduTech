import React, { useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import { YStack } from "tamagui"
import {
  CodeField,
  Cursor,
  isLastFilledCell,
  MaskSymbol,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { colors } from "../../../../components/EduUIKit/theme"
import { EduBody, EduHeading } from "../../../../components"

const CELL_COUNT = 4

type PinFormProps = { onChange?: (code: string) => void }

export const PinForm = (props: PinFormProps) => {
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [fieldProps, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue })

  useEffect(() => {
    ref.current.focus()
  }, [])

  useEffect(() => {
    value.length
      && value.length === CELL_COUNT
      && props.onChange
      && props.onChange(value)
  }, [value])

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null

    if (symbol) {
      textChild = (
        <MaskSymbol maskSymbol="⚫" delay={100} isLastFilledCell={isLastFilledCell({ index, value })}>
          {symbol}
        </MaskSymbol>
      )
    } else if (isFocused) {
      textChild = <Cursor />
      // delay={100000}
    }

    return (
      <YStack
        theme="input"
        // style={[$cell, isFocused && $focusCell]}
        key={index}
        height={61}
        flex={1}
        borderWidth={1}
        maw={100}
        br="$4" ai="center" als="center" ac="center" jc="center"
        marginHorizontal="$2"
        borderColor={!isFocused ? "$greyscale200" : "$primary500"}
        bc={!isFocused ? "$background" : "$greyscale50"}
        onLayout={getCellOnLayoutHandler(index)}>
        <EduHeading preset="h4" children={textChild} />
      </YStack>
    )
  }

  return (
    <YStack ai="center" marginHorizontal="$4" space="$12">
      <YStack height="$8" />
      <EduBody size="xl" weight="regular" text="Enter your PIN to confirm payment" />
      <CodeField
        ref={ref}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={$codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
        {...fieldProps}
      />
    </YStack>
  )
}

const $codeFieldRoot: ViewStyle = { marginTop: 20 }
const $cell = {
  flex: 1,
  maxWidth: 100,
  marginHorizontal: 8,
  height: 61,
  lineHeight: 55,
  borderColor: colors.greyscale[200],
  textAlign: 'center',
}
const $focusCell = {
  color: colors.primary[500],
  borderColor: colors.primary[500],
  backgroundColor: "rgba(51, 94, 247, 0.08)"
}
