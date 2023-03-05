import { observer } from "mobx-react-lite"
import { Box, Column, Icon } from "native-base"
import React, { FC, useCallback, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
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
import { DataProvider, LayoutProvider, RecyclerListView } from "recyclerlistview"
import { PaymentCard } from "../components"

interface PaymentScreenProps extends AppStackScreenProps<"Payment"> { }

export const PaymentScreen: FC<PaymentScreenProps> = observer(_props => {
  const { navigation } = _props
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
  }, [paymentStore])

  const renderFooter = useCallback(() => {
    if (isLoading) return <ActivityIndicator />

    if (!paymentStore.payments.length) {
      return (<EmptyState
        preset="generic"
        style={{ marginTop: 48 }}
        buttonOnPress={manualRefresh}
        imageStyle={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
        ImageProps={{ resizeMode: "contain" }}
      />)
    }

    return <Box />
  }, [])

  const rowRenderer = useCallback((type, item, index) => {
    const payment = paymentStore.payments[index]

    return (
      <Box key={payment.id} paddingLeft='5' paddingRight='5' >
        <PaymentCard
          key={payment.id}
          payment={payment}
          RightActionComponent={
            <EduBody sizeT="large" numberOfLines={1}
              color="primary.500" tx="common.connected" />
          }
          onPress={() => { }}
          connected={paymentStore.hasConnected(payment)}
        />
      </Box>
    )
  }, [])

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

  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right", "bottom"]}>
      <Column height="full">
        <Box flex={1}>
          <RecyclerListView
            scrollViewProps={{
              contentContainerStyle: {
                paddingTop: 24,
                paddingBottom: 24
              },
              showsVerticalScrollIndicator: false,
              // ItemSeparatorComponent: <Box height="2" />,
              refreshControl: (
                <RefreshControl refreshing={refreshing} onRefresh={manualRefresh} />
              )
            }}
            renderFooter={renderFooter}
            rowRenderer={rowRenderer}
            dataProvider={new DataProvider((r1, r2) => {
              return r1 !== r2
            }).cloneWithRows(paymentStore.payments)}
            layoutProvider={layoutProvider}
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
},
)

//Adjustment for margin given to RLV;
const windowWidth = Math.round(Dimensions.get('window').width * 1000) / 1000 - 6;

const layoutProvider = new LayoutProvider(
  (index) => 'NORMAL',
  (type, dim) => {
    dim.width = windowWidth
    dim.height = 100
  })

