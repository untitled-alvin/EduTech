import { observer } from "mobx-react-lite"
import { RadioGroup, YStack } from "tamagui"
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from "react"
import { FlatList } from "react-native"
import {
  EmptyState,
  ActivityIndicator,
  Body,
  RadioGroupIndicator,
  RadioGroupItem,
  RadioGroupItemProps,
} from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { PaymentCard } from "./PaymentCard"
import { Payment } from "../models/Payment"

interface PaymentMethodSelectorProps {
  Footer?: ReactElement
  onChanged?: (value: Payment) => void
}

export const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = observer(props => {
  const { Footer } = props
  const { paymentStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState<string>(null)

  // useEffect(() => {
  //   setDefaultValue()
  // }, [])

  useEffect(() => {
    load().then(() => setDefaultValue())
  }, [])

  useEffect(() => {
    const payment = paymentStore.payments.find(({ id }) => id === selected)
    props?.onChanged && props.onChanged(payment)
  }, [selected])

  const ListHeaderComponent = useMemo(() => () => (
    <Body margin="$6" size="large" tx="payment.selectPaymentText" />
  ), [])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? <ActivityIndicator /> : <EmptyState />
  }, [isLoading])

  const renderItem = useCallback(({ item: payment }) => (
    <PaymentCard
      payment={payment}
      marginHorizontal="$6"
      onPress={() => setSelected(payment.id)}
      RightActionComponent={<RightActionComponent value={payment.id} id={payment.id} />}
    />
  ), [])

  function setDefaultValue() {
    if (paymentStore.payments.length) {
      setSelected(paymentStore.payments[0]?.id)
    } else { }
  }

  async function load() {
    setIsLoading(true)
    await paymentStore.fetchPayments()
    setIsLoading(false)
  }

  // simulate a longer refresh, if the refresh is too fast for UX
  async function manualRefresh() {
    setRefreshing(true)
    await paymentStore.fetchPayments()
    setRefreshing(false)
  }

  return paymentStore.payments.length && (
    <RadioGroup name="methods" value={selected} onValueChange={setSelected}>
      <FlatList<Payment>
        data={paymentStore.payments}
        extraData={paymentStore.payments.length}
        showsVerticalScrollIndicator={false}
        onRefresh={manualRefresh}
        refreshing={refreshing}
        ItemSeparatorComponent={() => <YStack height="$6" />}
        renderItem={renderItem}
        ListFooterComponent={Footer}
        ListEmptyComponent={<ListEmptyComponent />}
        ListHeaderComponent={<ListHeaderComponent />}
      />
    </RadioGroup>
  )
})


const RightActionComponent = (props: RadioGroupItemProps) => (
  <RadioGroupItem {...props} >
    <RadioGroupIndicator />
  </RadioGroupItem>
)