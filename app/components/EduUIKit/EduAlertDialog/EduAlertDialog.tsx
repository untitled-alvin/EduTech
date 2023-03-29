import { AlertDialog, AlertDialogDescription, AlertDialogTitle, styled } from 'tamagui'
import { EduBody, EduBodyProps, EduHeading, EduHeadingProps } from '../Typography'

type EduAlertDialogDescriptionProps = EduBodyProps
type EduAlertDialogTitleProps = EduHeadingProps

export const EduAlertDialogDescription = (props: EduAlertDialogDescriptionProps) => {
  return (
    <AlertDialogDescription>
      <EduBody textAlign="center" type="regular" sizeT="large" {...props} />
    </AlertDialogDescription>
  )
}

export const EduAlertDialogTitle = (props: EduAlertDialogTitleProps) => {
  return (
    <AlertDialogTitle>
      <EduHeading textAlign="center" color="$primary500" preset="h4" {...props} />
    </AlertDialogTitle>
  )
}

export const EduAlertDialogOverlay = styled(AlertDialog.Overlay, {
  name: "EduAlertDialogOverlay",
  // animation: "quick",
  o: 0.7,
  enterStyle: { o: 0 },
  exitStyle: { o: 0 },
  backgroundColor: "black",
})

export const EduAlertDialogContent = styled(AlertDialog.Content, {
  name: "EduAlertDialogContent",
  elevate: true,
  bordered: true,
  space: true,
  // backgroundColor: "transparent",
  // animation: ['quick', { opacity: { overshootClamping: true } }],
  enterStyle: { x: 0, y: -20, opacity: 0, scale: 0.9 },
  exitStyle: { x: 0, y: 10, opacity: 0, scale: 0.95 },
  borderRadius: "$6",
  paddingVertical: "$8",
  paddingHorizontal: "$8",
  marginHorizontal: "$7",
  // exitStyle: { x: 0, y: 10, opacity: 0, scale: 0.95 },
  // scale: 1,
  // enterStyle: { x: 0, y: -20, opacity: 0, scale: 0.9 },
  // y: 0,
  // x: 0,
})

