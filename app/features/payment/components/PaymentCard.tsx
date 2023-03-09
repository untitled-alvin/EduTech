import React, { ReactElement } from "react"
import { Box, IBoxProps } from "native-base";
import { EduShadow, IconBrand, ListTile } from "../../../components";
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

interface PaymentCardProps extends IBoxProps {
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
    RightActionComponent,
    ...rest
  } = props

  const { type, name } = payment
  const icon = getIconByType(type)
  const displayText = type === "credit" ? `•••• •••• •••• •••• ${name.slice(- 4)}` : name

  return (
    <EduShadow preset="card_2">
      <Box height="20" backgroundColor="white" borderRadius="2xl" {...rest}>
        <ListTile
          paddingLeft="4"
          paddingRight="4"
          borderRadius="2xl"
          Leading={icon}
          title={{ text: displayText }}
          Trailing={RightActionComponent}
          onPress={onPress}
          {...Platform.select<AccessibilityProps>(
            {
              ios: { accessibilityLabel: payment.name },
              android: { accessibilityLabel: payment.name },
            }
          )}
        />
      </Box >
    </EduShadow>
  )
}
