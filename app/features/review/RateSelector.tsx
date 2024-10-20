import React, { useEffect, useMemo, useState } from "react"
import { FlatList } from "react-native"
import { YStack } from "tamagui"
import { Chip, Body, Star } from "../../components"
import { delay } from "../../utils/delay"

const listRates = [
  { key: 1 },
  { key: 2 },
  { key: 3 },
  { key: 4 },
  { key: 5 },
]

interface RateSelector {
  picked?: string
  onChanged?: (key?: string) => void
}

export const RateSelector = (props: RateSelector) => {
  const [rates, setRates] = useState([]);
  const [selected, setSelected] = useState<string>(null);

  useEffect(() => {
    setRates(listRates)
  }, [])

  useEffect(() => {
    props.onChanged && props.onChanged(selected)
  }, [selected])

  const Header = useMemo(() => () => {
    return (
      <Chip
        mr="$2"
        text={'All'}
        leftIcon={<Star set="bold" />}
        preset={!selected ? "filled" : "outline"}
        disabled={!selected}
        onPress={() => setSelected(null)}
      />
    )
  }, [selected])

  const renderItem = ({ index, item: { key } }) => {
    return (
      <Chip
        text={`${key}`}
        leftIcon={<Star set="bold" />}
        preset={key === selected ? "filled" : "outline"}
        disabled={key === selected}
        onPress={() => setSelected(key)}
      />
    )
  };

  return (
    <FlatList horizontal
      data={rates}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ListHeaderComponent={<Header />}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <YStack w="$2" />}
      ListEmptyComponent={<Body tx="emptyStateComponent.generic.heading" alignSelf="center" />}
      showsHorizontalScrollIndicator={false}
    />
  )
}
