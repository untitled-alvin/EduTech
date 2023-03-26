import { useNavigation } from "@react-navigation/core"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import {
  AssetsImage, AutoScrollView, BottomNavigator,
  Calendar, EduButton, EduInputCustom, EduShadow, Screen
} from "../../../components"
import { translate } from "../../../i18n"
import { useStores } from "../../../models"
import { PaymentModel } from "../models/Payment"
import { AppStackScreenProps } from "../../../navigators"
import { useLoadingService } from "../../../services/loading"
import { ArrowLeftIcon, MoreCircleIcon, useHeader } from "../../../utils/useHeader"
import { XStack, YStack } from "tamagui"
import { Dimensions, ImageStyle } from "react-native"
import { EduLabel } from "../../../components/EduUIKit/Form/EduLabel"

interface AddNewCardScreenProps extends AppStackScreenProps<"AddNewCard"> { }

export const AddNewCardScreen: FC<AddNewCardScreenProps> = observer(function AddNewCardScreen(props) {
  const navigation = useNavigation();
  const { paymentStore } = useStores()
  const loadingService = useLoadingService()

  const [cardName, setCardName] = useState(undefined)
  const [cardNumber, setCardNumber] = useState(undefined)
  const [expiryDate, setExpiryDate] = useState(undefined)
  const [cvv, setCVV] = useState(undefined)

  // const [cardName, setCardName] = useState("ANDREW AISLED")
  // const [cardNumber, setCardNumber] = useState('2672 4738 7837 7285')
  // const [expiryDate, setExpiryDate] = useState('09/07/26')
  // const [cvv, setCVV] = useState('699')

  useHeader({
    titleTx: "payment.addNewCard",
    LeftActionComponent: <ArrowLeftIcon />,
    onLeftPress: () => navigation.goBack(),
    RightActionComponent: <MoreCircleIcon />,
    onRightPress: () => { },
  })

  useEffect(() => {
    setCardName("ANDREW AISLED")
    setCardNumber('2672 4738 7837 7285')
    setExpiryDate('09/07/26')
    setCVV('699')
  }, [])

  async function submit() {
    loadingService.showLoading()
    const payment = PaymentModel.create({
      name: cardNumber,
      type: "credit",
      id: Math.floor(Math.random() * 100000).toString(),
    });
    await paymentStore.addPayment(payment)
    loadingService.hideLoading()
    navigation.goBack()
  }

  return (
    <Screen safeAreaEdges={["bottom", "left", "right"]} KeyboardAvoidingViewProps={{ enabled: false }} >
      <YStack h="$full">
        <YStack w="$full" flex={1}>
          <AutoScrollView>
            <AssetsImage image="card" style={$card} />
            <YStack flex={1} paddingHorizontal="$6" >

              <YStack>
                <EduLabel tx="payment.cardName" />
                <EduInputCustom
                  value={cardName}
                  autoCapitalize="characters"
                  onChangeText={setCardName}
                  placeholder={translate("payment.cardName")}
                  onSubmitEditing={submit}
                />
              </YStack>

              <YStack>
                <EduLabel tx="payment.cardNumber" />
                <EduInputCustom
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                  placeholder={translate("payment.cardNumber")}
                  onSubmitEditing={submit}
                />
                {/* <EduErrorMessage text={errors?.email} /> */}
              </YStack>

              <XStack space="$4">
                <YStack flex={1} >
                  <EduLabel tx="payment.expiryDate" />
                  <EduInputCustom
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder={translate("payment.expiryDate")}
                    RightSVGIcon={<Calendar set="curved" />}
                    onSubmitEditing={submit}
                  />
                </YStack>
                <YStack flex={1} >
                  <EduLabel tx="payment.cvv" />
                  <EduInputCustom
                    value={cvv}
                    onChangeText={setCVV}
                    keyboardType="numeric"
                    placeholder={translate("payment.cvv")}
                    onSubmitEditing={submit}
                  />
                </YStack>
              </XStack>

            </YStack>
          </AutoScrollView>
        </YStack>
        <BottomNavigator position="relative" >
          <EduShadow preset="button_1">
            <EduButton tx="payment.addNewCard" onPress={submit} />
          </EduShadow>
        </ BottomNavigator>
      </YStack>
    </Screen >
  )
}
)

const $card: ImageStyle = {
  width: Dimensions.get('window').width - 48, alignItems: "center", alignSelf: "center"
}
