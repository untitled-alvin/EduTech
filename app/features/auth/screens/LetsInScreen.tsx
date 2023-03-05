import { observer } from "mobx-react-lite"
import { Box, Column, Row, Flex, Text, Button } from 'native-base';
import React, { FC } from "react"
import {
  IconBrand, Screen, LinkButton, AssetsImage, EduDivider, EduBody, EduButton
} from "../../../components"
import { translate } from "../../../i18n"
import { useStores } from "../../../models"
import { AppStackScreenProps } from "../../../navigators"
import { useLoadingService } from "../../../services/loading";
import { useHeader } from "../../../utils/useHeader";
import { LestInHeading } from "../components";

interface LetsInScreenProps extends AppStackScreenProps<"LetsIn"> { }

export const LetsInScreen: FC<LetsInScreenProps> = observer(function LetsInScreen(_props) {
  const { navigation } = _props
  const { authenticationStore } = useStores()
  const loadingService = useLoadingService()

  useHeader({
    backgroundColor: 'white'
  })

  async function loginGoogle() {
    loadingService.showLoading()
    await authenticationStore.loginGoogle();
    loadingService.hideLoading()
  }

  return (
    <Screen safeAreaEdges={["bottom", "left", "right"]}>
      <Column marginLeft={6} marginRight={6}
        height={"full"} justifyContent="flex-start">

        <Column justifyContent="flex-start" >
          <Box height='6' />
          <AssetsImage
            marginTop={'4'}
            resizeMode="contain"
            alignContent={'flex-start'}
            alignItems={'flex-start'}
            alignSelf={'center'}
            image="letsIn"
          />
          <Box height='2' />
          <LestInHeading
            textAlign='center'
            marginTop='8'
            marginBottom='8'
            tx="letsIn.letSYouIn"
          />
        </Column>

        <Box height='4' />

        <Column flex={1}  >
          <Flex flex={[3, 1, 0.5, 0, 0]} />
          <Button variant='outline' height={60} borderRadius={16}
            leftIcon={<IconBrand icon="google" marginRight={2} size="6" />}
            onPress={loginGoogle}>
            <EduBody type="semibold" tx="letsIn.continueWithGoogle" />
          </Button>

          <Flex flex={[3, 1, 0.5, 0, 0]} />

          <Row marginLeft="8" marginRight="8"
            alignItems={'center'}
            justifyContent='center'>
            <EduDivider flex={1} />
            <Text
              fontSize='lg'
              fontWeight='semibold'
              color={'greyScale.700'}
              marginLeft="4"
              marginRight="4"
            >
              {translate('common.or').toLocaleLowerCase()}
            </Text>
            <EduDivider flex={1} />
          </Row>

          <Flex flex={[3, 1, 0.5, 0, 0]} />

          <EduButton
            displayShadow
            tx="letsIn.signInWithPassword"
            marginBottom={"6"}
            onPress={() => navigation.push('SignIn')}
          />

          <Flex flex={4} />

          <Row justifyContent='center' alignItems={'center'} >
            <EduBody color="greyScale.500" type="regular"
              text={`${translate("letsIn.donTHaveAnAccount")} `} />
            <LinkButton tx="common.signUp" onPress={() => navigation.push('SignUp')} />
          </Row>
          <Flex flex={2} />
        </Column>
      </Column >
    </Screen >
  )
})



