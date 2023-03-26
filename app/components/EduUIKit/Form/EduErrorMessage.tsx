import { EduBody, EduBodyProps } from "../Typography";

export function EduErrorMessage(props: EduBodyProps) {
  if (!props.children && !props.text && !props.tx) return null
  return <EduBody sizeT="small" {...props} color="$statusError" mb="$1" mt="$2" />
}
