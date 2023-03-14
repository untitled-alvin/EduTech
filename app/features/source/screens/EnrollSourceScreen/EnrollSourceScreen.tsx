import { Box, Column, Icon } from "native-base"
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  BottomNavigator, EduButton, EnrollSuccessDialog, MoreCircle, Screen
} from "../../../../components"
import { translate } from "../../../../i18n"
import { Payment } from "../../../payment/models/Payment"
import { AppStackScreenProps } from "../../../../navigators"
import { useHeader } from "../../../../utils/useHeader"
import { PaymentMethodSelector } from "../../../payment"

import { PinForm } from "./PinForm"

interface EnrollSourceScreenProps extends AppStackScreenProps<"EnrollSource"> { }

export const EnrollSourceScreen: FC<EnrollSourceScreenProps> = (_props) => {
  const { navigation } = _props
  const dialogRef = useRef(null)
  // const [isOpen, setIsOpen] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isAccept, setIsAccept] = useState(false)
  const [code, setCode] = useState('')

  useHeader({
    leftIcon: "arrowLeft",
    titleTx: "source.enrollCourse",
    onLeftPress: () => navigation.goBack(),
    RightActionComponent: (
      <Icon marginLeft="4" marginRight="4"
        as={<MoreCircle set="light" />}
        color="greyscale.900" />),
    onRightPress: () => { },
  })

  useEffect(() => {
    if (code.length > 3) {
      setIsOpen(true)
    }
  }, [code])

  const onPaymentChanged = useCallback((payment?: Payment) => {
    // console.log(payment)
  }, [])

  const onViewSource = useCallback(() => {
    setIsOpen(false)
    navigation.goBack()
  }, [])

  const onViewEReceipt = useCallback(() => {
    setIsOpen(false)
  }, [])

  const ListFooterComponent = useMemo(() => function ListFooterComponent() {
    return (
      <EduButton
        preset="secondary"
        marginLeft='6' marginRight='6'
        onPress={() => navigation.push("AddNewCard")}
        marginTop={6}
        tx="payment.addNewCard"
      />
    )
  }, [])

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <Column height="full">
        <Box flex={1}>
          {isAccept ? (
            <PinForm onChange={setCode} />
          ) : (
            <PaymentMethodSelector
              onChanged={onPaymentChanged}
              ListFooterComponent={<ListFooterComponent />}
            />
          )}

        </Box>
        {/* <PinForm /> */}
        {/* <PaymentMethodSelector
            onChanged={onPaymentChanged}
            ListFooterComponent={<ListFooterComponent />}
          /> */}
        <BottomNavigator
          paddingTop="6"
          paddingRight="6"
          paddingLeft="6"
          borderWidth="1"
          borderTopRadius="3xl"
          position={"relative"}
          borderColor="greyscale.100"
          backgroundColor="white"
        >
          {!isAccept ? (
            <EduButton
              onPress={() => setIsAccept(true)}
              text={`${translate("source.enrollCourse")} - $40`}
            />
          ) : (
            <EduButton
              disabled
              // disabled={code.length < 4}
              onPress={() => setIsOpen(true)}
              text={`${translate("common.continue")}`}
            />
          )}
        </BottomNavigator >
      </Column>
      <EnrollSuccessDialog
        leastDestructiveRef={dialogRef}
        isOpen={isOpen}
        onViewEReceipt={onViewEReceipt}
        onViewSource={onViewSource} />
    </Screen>
  )
}
