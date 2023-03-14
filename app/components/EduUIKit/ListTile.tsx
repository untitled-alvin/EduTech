import React, { ReactElement } from "react"
import { Box, Button, Column, IButtonProps, Row } from 'native-base';
import { EduBody, EduBodyProps } from "./Typography/EduBody";
import { EduHeading } from "./Typography/EduHeading";

export interface ListTileProps extends IButtonProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  title?: EduBodyProps
  /**
   * The text to display if not using `tx` or nested components.
   */
  subtitle?: EduBodyProps
  /**
   * Right action custom ReactElement.
   * Overrides `leftIcon`.
   */
  Leading?: ReactElement
  /**
   * Right action custom ReactElement.
   * Overrides rightIcon`.
   */
  Trailing?: ReactElement
}

export function ListTile(props: ListTileProps) {
  const {
    title, subtitle, Leading, Trailing, ...rest
  } = props

  return (
    <Button
      padding="6"
      height="20"
      colorScheme="blue"
      variant="ghost"
      borderRadius="none"
      {...rest}
    >
      <Row width="full" justifyContent="space-evenly" alignItems="center">
        {Leading && (<Box marginRight="4">{Leading}</Box>)}
        <Box flex={1}>
          <Column>
            {title && (<EduHeading
              preset="h6"
              numberOfLines={2}
              color={"greyscale.900"}
              {...title} />
            )}

            {subtitle && (<EduBody
              marginTop="1"
              numberOfLines={1}
              color={"greyscale.700"}
              {...subtitle}
            />)}

          </Column>
        </Box>
        {Trailing && (<Box marginLeft="4">{Trailing}</Box>)}
      </Row>
    </Button>
  )
}

