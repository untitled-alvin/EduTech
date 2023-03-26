import { EduBody, EduBodyProps } from "../Typography";

export function EduLabel(props: EduBodyProps) {
  return <EduBody type="bold" sizeT="xl" {...props} mb="$1" mt="$2" />
}
