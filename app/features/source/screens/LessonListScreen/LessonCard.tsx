import React, { useMemo } from "react"
import { Box, Button, Column, IBoxProps, Icon, Row, } from "native-base";
import { EduBody, EduHeading, Lock, Play } from "../../../../components";
import { AccessibilityProps, Platform } from "react-native";

interface LessonCardProps extends IBoxProps {
  title?: string,
  duration?: string,
  number?: string,
  locked?: boolean,
  onPress?: () => void,
}

export const LessonCard = function LessonCard(props: LessonCardProps) {
  const {
    title = "Why Using Figma",
    duration = "10 mins",
    number = "01",
    locked = false,
    onPress,
    ...rest
  } = props

  const accessibilityHintProps = useMemo(() =>
    Platform.select<AccessibilityProps>({
      ios: { accessibilityLabel: title },
      android: { accessibilityLabel: title },
    }),
    [title, locked],
  )

  return (
    <Box
      minHeight="20"
      maxHeight="20"
      backgroundColor="white"
      borderRadius="2xl"
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.06,
        shadowRadius: 60,
        elevation: 2,
      }}
      {...rest}
    >
      <Button
        paddingLeft="4"
        paddingRight="4"
        flex="1"
        borderRadius="2xl"
        colorScheme="blue"
        variant="ghost"
        onPress={onPress}
        {...accessibilityHintProps}
      >
        <Row width="full" justifyContent="space-evenly" alignItems="center" >
          <Box
            size="10"
            backgroundColor={"rgba(51, 94, 247, 0.08)"}
            borderRadius="full"
            justifyContent={"center"}
          >
            <EduHeading
              textAlign={"center"}
              preset="h6"
              color={"primary.500"}
              numberOfLines={1}
              text={number}
            />
          </Box>

          <Box width="4" />

          <Column flex={1} >
            <EduHeading preset="h6" numberOfLines={2} text={title} />
            <EduBody numberOfLines={1} text={duration} color="greyScale.700" />
          </Column>

          <Box width="4" />

          {
            locked
              ? <Icon as={<Lock set="curved" />} color="greyScale.500" />
              : <Icon as={<Play set="bold" />} color="primary.500" />
          }
        </Row>
      </Button>
    </Box >
  )
}
