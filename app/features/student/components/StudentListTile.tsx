import { Avatar, Icon } from "native-base"
import React, { useMemo } from "react"
import {
  AccessibilityProps,
  Platform,
} from "react-native"
import { ListTileProps, ListTile, Chat, rnrImages } from "../../../components"
import { translate } from "../../../i18n"
import { Student } from "../models/Student"

export interface StudentListTileProps extends ListTileProps {
  student: Student
}

export function StudentListTile(props: StudentListTileProps) {
  const { student, ...rest } = props

  const imageUri = useMemo(() => {
    return rnrImages[Math.floor(Math.random() * rnrImages.length)]
  }, [])

  /**
   * Android has a "longpress" accessibility action. iOS does not, so we just have to use a hint.
   * @see https://reactnative.dev/docs/accessibility#accessibilityactions
   */
  const accessibilityHintProps = useMemo(
    () =>
      Platform.select<AccessibilityProps>({
        ios: {
          accessibilityLabel: student.name,
          accessibilityHint: translate("demoPodcastListScreen.accessibility.cardHint"),
        },
        android: {
          accessibilityLabel: student.name,
        },
      }),
    [student],
  )

  return (
    <ListTile
      title={{ text: student.author }}
      subtitle={{ text: "Junior Designer" }}
      Leading={<Avatar size={"lg"} source={imageUri} />}
      Trailing={<Icon color="primary.500" as={<Chat set="light" />} />}
      {...accessibilityHintProps}
      {...rest}
    />
  )
}

