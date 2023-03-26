import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
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

interface PinFormProps {
  onChange?: (code: string) => void
}

export const PinForm = function PinForm(_props: PinFormProps) {
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  useEffect(() => {
    ref.current.focus()
  }, [])

  useEffect(() => {
    value.length
      && value.length === CELL_COUNT
      && _props.onChange
      && _props.onChange(value)
  }, [value])

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null

    if (symbol) {
      textChild = (
        <MaskSymbol
          maskSymbol="⚫"
          delay={100}
          isLastFilledCell={isLastFilledCell({ index, value })}>
          {symbol}
        </MaskSymbol>
      )
    } else if (isFocused) {
      textChild = <Cursor />
      // delay={100000}
    }

    return (
      <YStack
        // style={[styles.cell, isFocused && styles.focusCell]}
        key={index}
        height={61}
        flex={1}
        borderWidth={1}
        maw={100}
        br="$4"
        ai="center" als="center" ac="center" jc="center"
        marginHorizontal="$2"
        borderColor={!isFocused ? "$greyscale200" : "$primary500"}
        bc={!isFocused ? "$greyscale50" : "rgba(51, 94, 247, 0.08)"}
        onLayout={getCellOnLayoutHandler(index)}
      >
        <EduHeading preset="h4" children={textChild} />
      </YStack>
    )
  }

  return (
    <YStack marginHorizontal="$4">
      <YStack height="$40" />
      <EduBody
        alignSelf="center"
        sizeT="xl"
        type="regular"
        text="Enter your PIN to confirm payment"
      />
      <YStack height="$12" />
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
    </YStack>
  )
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20
  },
  cell: {
    // width: 83,
    flex: 1,
    maxWidth: 100,
    marginHorizontal: 8,
    height: 61,
    lineHeight: 55,
    borderColor: colors.greyscale[200],
    textAlign: 'center',
  },
  focusCell: {
    color: colors.primary[500],
    borderColor: colors.primary[500],
    backgroundColor: "rgba(51, 94, 247, 0.08)"
  },
})

