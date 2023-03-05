import { useNavigation } from "@react-navigation/core"
import { observer } from "mobx-react-lite"
import { Box, Center, Column, FormControl, Icon, Row } from "native-base"
import React, { FC, useEffect, useState } from "react"
import {
  AssetsImage, AutoScrollView, BottomNavigator,
  Calendar, EduBody, EduBodyProps, EduButton,
  EduInput, MoreCircle, Screen
} from "../../../components"
import { translate } from "../../../i18n"
import { useStores } from "../../../models"
import { PaymentModel } from "../models/Payment"
import { AppStackScreenProps } from "../../../navigators"
import { useLoadingService } from "../../../services/loading"
import { delay } from "../../../utils/delay"
import { useHeader } from "../../../utils/useHeader"

interface AddNewCardScreenProps extends AppStackScreenProps<"AddNewCard"> { }

export const AddNewCardScreen: FC<AddNewCardScreenProps> = observer(function AddNewCardScreen(_props) {
  const navigation = useNavigation();
  const { paymentStore } = useStores()
  const loadingService = useLoadingService()

  // const [cardName, setCardName] = useState('')
  // const [cardNumber, setCardNumber] = useState('')
  // const [expiryDate, setEmail] = useState('')
  // const [cvv, setCVV] = useState('')

  const [cardName, setCardName] = useState("ANDREW AISLED")
  const [cardNumber, setCardNumber] = useState('2672 4738 7837 7285')
  const [expiryDate, setExpiryDate] = useState('09/07/26')
  const [cvv, setCVV] = useState('699')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useHeader({
    leftIcon: "arrowLeft",
    onLeftPress: () => navigation.goBack(),
    RightActionComponent: (
      <Icon marginLeft="4" marginRight="4"
        as={<MoreCircle set="light" />}
        color="greyScale.900" />),
    onRightPress: () => { },
    titleTx: "payment.addNewCard",
  })

  useEffect(() => {
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
  }, [])

  async function submit() {
    loadingService.showLoading()
    await Promise.all([delay(700)])
    const payment = PaymentModel.create({
      name: cardNumber,
      type: "credit",
      id: Math.floor(Math.random() * 100000).toString(),
    });
    paymentStore.addPayment(payment)
    loadingService.hideLoading()
    navigation.goBack()
  }


  return (
    <Screen safeAreaEdges={["bottom", "left", "right"]}
      KeyboardAvoidingViewProps={{ enabled: false }} >

      <Center height="full">
        <Center width="full" flex={1}>
          <AutoScrollView style={{ paddingHorizontal: 24 }}>
            <AssetsImage image="card" alignSelf={"center"} />
            <FormControl isInvalid>
              <Label tx="payment.cardName" />
              <EduInput
                value={cardName}
                autoCapitalize="characters"
                onChangeText={setCardName}
                placeholder={translate("payment.cardName")}
                onSubmitEditing={submit}
              />
              {/* <FormControl.ErrorMessage >Try different from previous passwords.</FormControl.ErrorMessage> */}


              <Label tx="payment.cardNumber" />
              <EduInput
                value={cardNumber}
                onChangeText={setCardNumber}
                keyboardType="numeric"
                placeholder={translate("payment.cardNumber")}
                onSubmitEditing={submit}
              />
              <FormControl.ErrorMessage >Try different from previous passwords.</FormControl.ErrorMessage>


              <Row>
                <Column flex={1} >
                  <Label tx="payment.expiryDate" />
                  <EduInput
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder={translate("payment.expiryDate")}
                    InputRightElement={<Calendar set="curved" size={'small'} />}
                    onSubmitEditing={submit}
                  />
                </Column>

                <Box width='4' />

                <Column flex={1} >
                  <Label tx="payment.cvv" />
                  <EduInput
                    value={cvv}
                    onChangeText={setCVV}
                    keyboardType="numeric"
                    placeholder={translate("payment.cvv")}
                    onSubmitEditing={submit}
                  />
                </Column>
              </Row>

              <FormControl.ErrorMessage >Try different from previous passwords.</FormControl.ErrorMessage>
            </FormControl>
          </AutoScrollView>
        </Center>
        <BottomNavigator position="relative" >
          <EduButton
            displayShadow
            tx="payment.addNewCard"
            onPress={submit}
          />
        </ BottomNavigator>
      </Center>
    </Screen >
  )
}
)

function Label(props: EduBodyProps) {
  return <EduBody bold sizeT="xl" {...props} marginBottom="1" marginTop="2" />
}
