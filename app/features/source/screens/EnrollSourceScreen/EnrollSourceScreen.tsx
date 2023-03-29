import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { translate } from "../../../../i18n"
import { Payment } from "../../../payment/models/Payment"
import { AppStackScreenProps } from "../../../../navigators"
import { MoreCircleIcon } from "../../../../utils/useHeader"
import { BottomNavigator, EduButton, EnrollSuccessDialog, Screen } from "../../../../components"
import { PaymentMethodSelector } from "../../../payment"
import { YStack, } from 'tamagui'
import { PinForm } from "./PinForm"
import { useBackHeader } from "../../../../utils/useBackHeader"

interface EnrollSourceScreenProps extends AppStackScreenProps<"EnrollSource"> { }

export const EnrollSourceScreen: FC<EnrollSourceScreenProps> = (_props) => {
  const { navigation } = _props
  // const [isOpen, setIsOpen] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isAccept, setIsAccept] = useState(false)
  const [code, setCode] = useState('')

  useBackHeader({
    titleTx: "source.enrollCourse",
    RightActionComponent: <MoreCircleIcon />,
  })

  useEffect(() => {
    if (code.length > 3) {
      setIsOpen(true)
    }
  }, [code])

  const onPaymentChanged = useCallback((payment?: Payment) => { }, [])

  const onViewSource = useCallback(() => {
    setIsOpen(false)
    navigation.goBack()
  }, [])

  const onViewEReceipt = useCallback(() => {
    setIsOpen(false)
  }, [])

  const ListFooterComponent = useMemo(() => () => {
    return (
      <EduButton
        preset="secondary"
        marginHorizontal='$5'
        marginTop='$5'
        onPress={() => navigation.push("AddNewCard")}
        tx="payment.addNewCard"
      />
    )
  }, [])

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <YStack h="$full">
        <YStack flex={1}>
          {isAccept ? (
            <PinForm onChange={setCode} />
          ) : (
            <PaymentMethodSelector
              onChanged={onPaymentChanged}
              ListFooterComponent={<ListFooterComponent />}
            />
          )}
        </YStack>
        {/* <PinForm /> */}
        {/* <PaymentMethodSelector
            onChanged={onPaymentChanged}
            ListFooterComponent={<ListFooterComponent />}
          /> */}
        <BottomNavigator
          borderColor="$greyscale800"
          paddingTop="$6"
          paddingHorizontal="$6"
          borderWidth={1}
          borderBottomWidth={0}
          borderTopLeftRadius="$6"
          borderTopRightRadius="$6"
          position="relative"
        >
          {!isAccept ? (
            <EduButton onPress={() => setIsAccept(true)}
              text={`${translate("source.enrollCourse")} - $40`}
            />
          ) : (
            <EduButton disabled
              // disabled={code.length < 4}
              onPress={() => setIsOpen(true)}
              text={`${translate("common.continue")}`}
            />
          )}
        </BottomNavigator>
        <EnrollSuccessDialog
          open={isOpen}
          onViewEReceipt={onViewEReceipt}
          onViewSource={onViewSource}
        />
      </YStack>
    </Screen>
  )
}
