import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { translate } from "../../../../i18n"
import { Payment } from "../../../payment/models/Payment"
import { AppStackScreenProps } from "../../../../navigators"
import { MoreButton } from "../../../../utils/useHeader"
import { BottomNavigator, Button, Screen } from "../../../../components"
import { PaymentMethodSelector } from "../../../payment"
import { YStack, } from 'tamagui'
import { PinForm } from "./PinForm"
import { useBackHeader } from "../../../../utils/useBackHeader"
import { EnrollSuccessDialog } from "./EnrollSuccessDialog"

interface EnrollSourceScreenProps extends AppStackScreenProps<"EnrollSource"> { }

export const EnrollSourceScreen: FC<EnrollSourceScreenProps> = (props) => {
  const { navigation } = props
  const [code, setCode] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isAccept, setIsAccept] = useState(false)

  useBackHeader({
    titleTx: "source.enrollCourse",
    RightActionComponent: <MoreButton />,
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

  const FooterComponent = useMemo(() => () => (
    <Button preset="secondary"
      tx="payment.addNewCard"
      marginTop='$5' marginHorizontal='$5'
      onPress={() => navigation.push("AddNewCard")} />
  ), [])

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <YStack h="$full">
        <YStack flex={1}>
          {isAccept ? (
            <PinForm onChange={setCode} />
          ) : (
            <PaymentMethodSelector onChanged={onPaymentChanged} Footer={<FooterComponent />} />
          )}
        </YStack>
        <BottomNavigator
          borderColor="$divider"
          paddingTop="$6"
          paddingHorizontal="$6"
          borderWidth={1}
          borderBottomWidth={0}
          borderTopLeftRadius="$6"
          borderTopRightRadius="$6"
          position="relative"
        >
          {/* disabled={code.length < 4} */}
          {isAccept ? (
            <Button disabled onPress={() => setIsOpen(true)} tx="common.continue" />
          ) : (
            <Button onPress={() => setIsAccept(true)}
              text={`${translate("source.enrollCourse")} - $40`} />
          )}
        </BottomNavigator>

        <EnrollSuccessDialog open={isOpen}
          onViewSource={onViewSource}
          onViewEReceipt={onViewEReceipt} />

      </YStack>
    </Screen>
  )
}
