import { AlertDialog, styled } from 'tamagui'

export const EduDialogOverlay = styled(AlertDialog.Overlay, {
  key: "overlay",
  name: "EduDialogOverlay",
  // animation: "quick",
  o: 0.7,
  backgroundColor: "black",
  exitStyle: { o: 0 },
  enterStyle: { o: 0 },
})
