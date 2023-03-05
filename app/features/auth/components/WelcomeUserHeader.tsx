import { observer } from "mobx-react-lite"
import { Box, Row, IBoxProps } from 'native-base';
import React, { FC } from "react"
import { EduBody, EduHeading } from "../../../components";
import { useStores } from "../../../models";
import { UserAvatar } from "./UserAvatar";


interface WelcomeUserHeaderProps extends IBoxProps { }

export const WelcomeUserHeader: FC<WelcomeUserHeaderProps> = observer(function WelcomeUserHeader(_props) {
  const { authenticationStore:
    { isAuthenticated, isAuthenticating, user }
  } = useStores()

  const userName = user?.fullname ?? "User"
  // const userName = user?.fullname ?? "Andrew Aisled"

  return (
    <Row padding="4" paddingLeft="6" paddingRight="6" alignItems="center">
      <UserAvatar size='md' />
      <Box width='4' />
      <Box>
        <EduBody type="regular" sizeT="large" tx="homeScreen.header" />
        <EduHeading preset="h5" >{userName}</EduHeading>
      </Box>
    </Row>
  )
})