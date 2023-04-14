import { Body, BodyProps } from "../typography";

export function ErrorMessage(props: BodyProps) {
  if (!props.children && !props.text && !props.tx) return null
  return <Body size="small" {...props} color="$statusError" mb="$1" mt="$2" />
}
