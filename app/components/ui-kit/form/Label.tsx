import { Body, BodyProps } from "../typography";

export const Label = (props: BodyProps) => {
  return <Body weight="bold" size="xl" {...props} mb="$1" mt="$2" />
}
