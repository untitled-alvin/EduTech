import React, { ReactElement } from "react"
import { AccessibilityProps, Platform } from "react-native";
import { EduShadow, BrandIcon, ListTile, ListTileProps } from "../../../components";
import { Payment } from "../models/Payment";

function getIconByType(type: string) {
  switch (type) {
    case "apple_pay":
      return <BrandIcon icon="apple" />
    case "google_pay":
      return <BrandIcon icon="googleEL" />
    case "paypal":
      return <BrandIcon icon="paypal" />
    case "credit":
      return <BrandIcon icon="masterCard" />
    case "other":
      return <BrandIcon icon="masterCard" />
    default:
      return <BrandIcon icon="masterCard" />
  }
}

type PaymentCardProps = ListTileProps & {
  payment: Payment
  connected?: boolean
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
      <ListTile h="$20" br="$4" paddingHorizontal="$4"
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
        {...rest}
      />
    </EduShadow>
  )
}
