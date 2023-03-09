import { observer } from "mobx-react-lite"
import { Box, Column, Icon } from "native-base"
import React, { FC, useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
} from "react-native"
import {
  BottomNavigator, EduBody,
  EduButton, EmptyState,
  MoreCircle, Screen
} from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { useHeader } from "../../../utils/useHeader"
import { PaymentCard } from "../components"
import { Payment } from "../models"
import BigList from "react-native-big-list"

interface PaymentScreenProps extends AppStackScreenProps<"Payment"> { }

export const PaymentScreen: FC<PaymentScreenProps> = observer(props => {
  const { navigation } = props
  const { paymentStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useHeader({
    leftIcon: "arrowLeft",
    onLeftPress: () => navigation.goBack(),
    RightActionComponent: (
      <Icon marginLeft="4" marginRight="4"
        as={<MoreCircle set="light" />}
        color="greyScale.900" />),
    onRightPress: () => { },
    titleTx: "common.payment",
  })

  useEffect(() => {
    load()
  }, [])

  const ListEmptyComponent = useMemo(() => function ListEmptyComponent() {
    return isLoading ? (
      <ActivityIndicator />
    ) : (
      <EmptyState
        preset="generic"
        style={{ marginTop: 48 }}
        // buttonOnPress={manualRefresh}
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }} />
    )
  }, [isLoading])

  const load = async () => {
    setIsLoading(true)
    await paymentStore.fetchPayments()
    setIsLoading(false)
  }

  const manualRefresh = async () => {
    setRefreshing(true)
    await paymentStore.fetchPayments()
    setRefreshing(false)
  }

  const renderItem = ({ item, index }) => {
    return (
      <PaymentCard
        marginLeft="5"
        marginRight="5"
        key={item.id}
        payment={item}
        onPress={() => { }}
        RightActionComponent={
          <EduBody sizeT="large" numberOfLines={1}
            color="primary.500" tx="common.connected" />
        }
        connected={paymentStore.hasConnected(item)}
      />
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <Column height="full">
        <Box flex={1}>
          <BigList<Payment>
            data={paymentStore.payments}
            refreshing={refreshing}
            onRefresh={manualRefresh}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<ListEmptyComponent />}
            itemHeight={100}
            renderItem={renderItem}
            contentContainerStyle={{ justifyContent: "center", paddingVertical: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </Box>
        <BottomNavigator position="relative">
          <EduButton
            displayShadow
            tx="payment.addNewCard"
            onPress={() => navigation.push("AddNewCard")}
          />
        </BottomNavigator>
      </Column>
    </Screen>
  )
})
