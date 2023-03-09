import { observer } from "mobx-react-lite"
import { Box, Radio } from "native-base"
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
} from "react-native"
import { EduBody, EmptyState } from "../../../components"
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

  const ListHeaderComponent = useMemo(() => function ListHeaderComponent() {
    return <EduBody margin={6} sizeT="large"
      tx="payment.selectPaymentText" />
  }, [])

  const renderItem = useCallback(({ index }) => {
    const payment = paymentStore.payments[index]

    return (
      <PaymentCard
        key={payment.id}
        marginLeft='6'
        marginRight='6'
        payment={payment}
        RightActionComponent={<Radio
          borderWidth={3} padding={0.5}
          value={payment.id} accessibilityLabel={payment.id}
        />}
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
    <Radio.Group name="PaymentMethods" value={selected} onChange={setSelected}>
      <FlatList<Payment>
        data={paymentStore.payments}
        extraData={paymentStore.payments.length}
        showsVerticalScrollIndicator={false}
        onRefresh={manualRefresh}
        refreshing={refreshing}
        ItemSeparatorComponent={() => <Box height="6" />}
        renderItem={renderItem}
        ListHeaderComponent={<ListHeaderComponent />}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyState
              preset="generic"
              // buttonOnPress={manualRefresh}
              imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
      />
    </Radio.Group>
  )
})
