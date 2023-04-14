import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import {
  BottomNavigator,
  EduActivityIndicator,
  Body,
  Button,
  RefreshControl,
  EduShadow,
  EmptyState,
  Screen
} from "../../../components"
import { isRTL } from "../../../i18n"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { MoreButton } from "../../../utils/useHeader"
import { PaymentCard } from "../components"
import { Payment } from "../models"
import { YStack } from "tamagui"
import { useBackHeader } from "../../../utils/useBackHeader"
import { FlashList } from "@shopify/flash-list"

interface PaymentScreenProps extends AppStackScreenProps<"Payment"> { }

export const PaymentScreen: FC<PaymentScreenProps> = observer(props => {
  const { navigation } = props
  const { paymentStore } = useStores()
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useBackHeader({
    titleTx: "common.payment",
    RightActionComponent: <MoreButton />,
  })

  useEffect(() => {
    load()
  }, [])

  const ListEmptyComponent = useMemo(() => () => {
    return isLoading ? (
      <EduActivityIndicator />
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

  const renderItem = ({ item }) => {
    return (
      <PaymentCard
        marginHorizontal="$5"
        payment={item}
        onPress={() => { }}
        RightActionComponent={<Connected />}
        connected={paymentStore.hasConnected(item)}
      />
    )
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <YStack height="$full">
        <YStack flex={1}>
          <FlashList<Payment>
            data={paymentStore.payments}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={manualRefresh} />}
            ItemSeparatorComponent={() => <YStack h="$6" />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<ListEmptyComponent />}
            estimatedItemSize={100}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 24 }}
            showsVerticalScrollIndicator={false}
          />
        </YStack>
        <BottomNavigator position="relative">
          <EduShadow preset="button_1">
            <Button tx="payment.addNewCard" onPress={() => navigation.push("AddNewCard")} />
          </EduShadow>
        </BottomNavigator>
      </YStack>
    </Screen>
  )
})

const Connected = () => (
  <Body size="large" numberOfLines={1} color="$primary500" tx="common.connected" />
)