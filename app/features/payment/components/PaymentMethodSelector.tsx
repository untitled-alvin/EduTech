import { observer } from "mobx-react-lite"
import { RadioGroup, YStack } from "tamagui"
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, FlatList } from "react-native"
import { EduBody, EduRadioGroupIndicator, EduRadioGroupItem, EmptyState } from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { PaymentCard } from "./PaymentCard"
import { Payment } from "../models/Payment"

interface PaymentMethodSelectorProps {
  ListFooterComponent?: ReactElement
  onChanged?: (value: Payment) => void
}

export const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = observer(props => {
  const { ListFooterComponent } = props
  const { paymentStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState<string>(null)

  useEffect(() => {
    setDefaultValue()
  }, [])

  useEffect(() => {
    load().then(() => setDefaultValue())
  }, [])

  useEffect(() => {
    const payment = paymentStore.payments.find(({ id }) => id === selected)
    props?.onChanged && props.onChanged(payment)
  }, [selected])

  const ListHeaderComponent = useMemo(() => () => {
    return <EduBody margin="$6" size="large" tx="payment.selectPaymentText" />
  }, [])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? (
      <ActivityIndicator />
    ) : (
      <EmptyState
        preset="generic"
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }}
      />
    )
  }, [isLoading])

  const renderItem = useCallback(({ index }) => {
    const payment = paymentStore.payments[index]

    return (
      <PaymentCard
        key={payment.id}
        marginHorizontal="$6"
        payment={payment}
        RightActionComponent={
          <EduRadioGroupItem value={payment.id} id={payment.id} >
            <EduRadioGroupIndicator />
          </EduRadioGroupItem>
        }
        onPress={() => setSelected(payment.id)}
      />
    )
  }, [])

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
        ListHeaderComponent={<ListHeaderComponent />}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={<ListEmptyComponent />}
      />
    </RadioGroup>
  )
})
