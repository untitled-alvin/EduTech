import { AlertDialog, styled } from 'tamagui'

export const EduDialogContent = styled(AlertDialog.Content, {
  key: "content",
  name: "EduDialogContent",
  elevate: true,
  animation: [
    'quick',
    {
      opacity: {
        overshootClamping: true,
      },
    },
  ],
  // exitStyle: { x: 0, y: 10, opacity: 0, scale: 0.95 },
  // scale: 1,
  // enterStyle: { x: 0, y: -20, opacity: 0, scale: 0.9 },
  // y: 0,
  // x: 0,
  // opacity: 1,
  borderRadius: "$6",
  paddingVertical: "$8",
  paddingHorizontal: "$8",
  marginHorizontal: "$7",
})
