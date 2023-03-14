import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Box, Column, Row, Icon, FormControl, IBoxProps, Text, Center } from "native-base"
import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { translate } from "../../../../i18n"
import { useStores } from "../../../../models"
import { delay } from "../../../../utils/delay"

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
      // <Text
      //   key={index}
      //   style={[styles.cell, isFocused && styles.focusCell]}
      //   onLayout={getCellOnLayoutHandler(index)}>
      //   {textChild}
      // </Text>
      <Center
        key={index}
        height={61}
        flex={1}
        maxW={100}
        borderWidth={1}
        // width={10}
        marginLeft="2"
        marginRight="2"
        maxWidth={100}
        borderRadius="xl"
        borderColor={!isFocused ? "greyscale.200" : "primary.500"}
        bg={!isFocused ? "greyscale.50" : "rgba(51, 94, 247, 0.08)"}
        onLayout={getCellOnLayoutHandler(index)}
      // marginHorizontal={8}
      // style={[styles.cell, isFocused && styles.focusCell]}
      >
        <EduHeading
          // borderRadius="xl"
          preset="h4"
          // borderWidth={1}
          // style={[styles.cell, isFocused && styles.focusCell]}
          // bg="greyscale.50"
          // onLayout={getCellOnLayoutHandler(index)}
          textAlign="center"
          children={textChild}
        />
      </Center>
    )
  }

  return (
    <Column
      marginLeft={4} marginRight={4}>
      <Box height={40} />
      <EduBody
        alignSelf="center"
        sizeT="xl"
        type="regular"
        text="Enter your PIN to confirm payment"
      />
      <Box height={12} />
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
    </Column>
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

