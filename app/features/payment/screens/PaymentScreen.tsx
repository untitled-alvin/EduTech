import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import { ActivityIndicator } from "react-native"
import {
  BottomNavigator, EduBody,
  EduButton, EduShadow, EmptyState, Screen
} from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { MoreCircleIcon } from "../../../utils/useHeader"
import { PaymentCard } from "../components"
import { Payment } from "../models"
import BigList from "react-native-big-list"
import { YStack } from "tamagui"
import { useBackHeader } from "../../../utils/useBackHeader"

interface PaymentScreenProps extends AppStackScreenProps<"Payment"> { }

export const PaymentScreen: FC<PaymentScreenProps> = observer(props => {
  const { navigation } = props
  const { paymentStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useBackHeader({
    titleTx: "common.payment",
    RightActionComponent: <MoreCircleIcon />,
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
        marginHorizontal="$5"
        key={item.id}
        payment={item}
        onPress={() => { }}
        RightActionComponent={
          <EduBody size="large" numberOfLines={1} color="$primary500" tx="common.connected" />
        }
        connected={paymentStore.hasConnected(item)}
      />
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <YStack height="$full">
        <YStack flex={1}>
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
        </YStack>
        <BottomNavigator position="relative">
          <EduShadow preset="button_1">
            <EduButton tx="payment.addNewCard"
              onPress={() => navigation.push("AddNewCard")}
            />
          </EduShadow>
        </BottomNavigator>
      </YStack>
    </Screen>
  )
})
