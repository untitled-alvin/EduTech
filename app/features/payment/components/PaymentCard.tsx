import React, { ReactElement, useMemo } from "react"
import { Box, Button, Row } from "native-base";
import { EduHeading, IconBrand, ListTile } from "../../../components";
import { AccessibilityProps, Platform } from "react-native";
import { Payment } from "../models/Payment";

function getIconByType(type: string) {
  switch (type) {
    case "apple_pay":
      return <IconBrand icon="apple" />
    case "google_pay":
      return <IconBrand icon="googleEL" />
    case "paypal":
      return <IconBrand icon="paypal" />
    case "credit":
      return <IconBrand icon="masterCard" />
    case "other":
      return <IconBrand icon="masterCard" />
    default:
      return <IconBrand icon="masterCard" />
  }
}

interface PaymentCardProps {
  payment: Payment
  connected?: boolean
  onPress?: () => void,
  RightActionComponent?: ReactElement
}

export function PaymentCard(props: PaymentCardProps) {
  const {
    payment,
    connected,
    onPress,
    RightActionComponent
  } = props

  const accessibilityHintProps = useMemo(() =>
    Platform.select<AccessibilityProps>({
      ios: {
        accessibilityLabel: payment.name,
      },
      android: {
        accessibilityLabel: payment.name,
      },
    }), [payment],
  )

  const { type, name } = payment
  const icon = getIconByType(type)
  const displayText = type === "credit" ? `•••• •••• •••• •••• ${name.slice(- 4)}` : name

  return (
    <Box
      minHeight="20"
      maxHeight="20"
      backgroundColor="white"
      borderRadius="2xl"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 60,
        elevation: 2,
      }}
    >
      <ListTile
        paddingLeft="4"
        paddingRight="4"
        borderRadius="2xl"
        Leading={icon}
        title={{ text: displayText }}
        Trailing={RightActionComponent}
        onPress={onPress}
        {...accessibilityHintProps}
      />
    </Box >
  )
}
