import React, { ReactElement } from "react"
import { Body, BodyProps, Heading, HeadingProps } from "../typography";
import { Button, XStack, YStack, styled, GetProps } from "tamagui";

export const ListTileFrame = styled(Button, {
    componentName: "ListTile",
    height: "$20",
    paddingVertical: "$2",
    paddingHorizontal: "$6",
    pressStyle: { opacity: 0.8 },
})

export type ListTileProps = GetProps<typeof ListTileFrame> & {
    /**
     * The text to display if not using `tx` or nested components.
     */
    title?: HeadingProps
    /**
     * The text to display if not using `tx` or nested components.
     */
    subtitle?: BodyProps
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

export const ListTile = ListTileFrame.extractable(
    ({ title, subtitle, Leading, Trailing, ...rest }: ListTileProps) => {
        return (
            <ListTileFrame {...rest}>
                <XStack w="$full" jc="space-evenly" ai="center" space="$4">
                    {Leading && Leading}
                    <YStack flex={1} space="$1" >
                        {title && <Heading preset="h6" numberOfLines={2} {...title} />}
                        {subtitle && <Body numberOfLines={1} color={"$greyscale700"} {...subtitle} />}
                    </YStack>
                    {Trailing && Trailing}
                </XStack>
            </ListTileFrame>
        )
    }
)