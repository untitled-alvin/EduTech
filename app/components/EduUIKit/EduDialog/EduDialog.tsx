import { Dialog, DialogDescription, DialogTitle, styled } from 'tamagui'
import { EduBody, EduBodyProps, EduHeading, EduHeadingProps } from '../Typography'

type EduDialogDescriptionProps = EduBodyProps

export const EduDialogDescription = (props: EduDialogDescriptionProps) => {
  return (
    <DialogDescription>
      <EduBody textAlign="center" type="regular" sizeT="large" {...props} />
    </DialogDescription>
  )
}

type EduDialogTitleProps = EduHeadingProps

export const EduDialogTitle = (props: EduDialogTitleProps) => {
  return (
    <DialogTitle>
      <EduHeading textAlign="center" color="$primary500" preset="h4" {...props} />
    </DialogTitle>
  )
}

export const EduDialogOverlay = styled(Dialog.Overlay, {
  name: "EduDialogOverlay",
  animation: "quick",
  o: 0.7,
  enterStyle: { o: 0 },
  exitStyle: { o: 0 },
  backgroundColor: "black",
})

export const EduDialogContent = styled(Dialog.Content, {
  name: "EduDialogContent",
  elevate: true,
  bordered: true,
  space: true,
  backgroundColor: "transparent",
  animation: ['quick', { opacity: { overshootClamping: true } }],
  enterStyle: { x: 0, y: -20, opacity: 0, scale: 0.9 },
  exitStyle: { x: 0, y: 10, opacity: 0, scale: 0.95 },
  borderRadius: "$6",
  paddingVertical: "$8",
  paddingHorizontal: "$8",
  marginHorizontal: "$7",
})


