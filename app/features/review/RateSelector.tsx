import React, { useEffect, useMemo, useState } from "react"
import { FlatList } from "react-native"
import { YStack } from "tamagui"
import { Chip, colors, EduBody, Star } from "../../components"
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

export function RateSelector(props: RateSelector) {
  const [rates, setRates] = useState([]);
  const [selected, setSelected] = useState<string>(null);

  useEffect(() => {
    Promise.all([delay(500)]).then(() => setRates(listRates))
  }, [])

  useEffect(() => {
    props.onChanged && props.onChanged(selected)
  }, [selected])

  const Header = useMemo(() => function Header() {
    return (
      <Chip
        marginRight="$2"
        key={'##first.item.guid'}
        text={'All'}
        leftIcon={<Star set="bold" />}
        type={!selected ? "filled" : "outline"}
        disabled={!selected}
        onPress={() => setSelected(null)}
      />
    )
  }, [selected])

  const renderItem = ({ index, item: { key } }) => {
    return (
      <Chip
        key={key}
        text={`${key}`}
        leftIcon={<Star set="bold" />}
        type={key === selected ? "filled" : "outline"}
        disabled={key === selected}
        onPress={() => setSelected(key)}
      />
    )
  };

  return (
    <FlatList
      data={rates}
      horizontal
      contentContainerStyle={{ paddingHorizontal: 24 }}
      ListHeaderComponent={<Header />}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <YStack width="$2" />}
      ListEmptyComponent={<EduBody tx="emptyStateComponent.generic.heading" alignSelf="center" />}
      showsHorizontalScrollIndicator={false}
    />
  )
}
