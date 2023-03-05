import { Box, FlatList, IBoxProps, Center } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import { Chip, EduBody, Star } from "../../components"
import { delay } from "../../utils/delay"

const listRates = [
  { key: 1 },
  { key: 2 },
  { key: 3 },
  { key: 4 },
  { key: 5 },
]

interface RateSelector extends IBoxProps {
  picked?: string
  onChanged?: (key?: string) => void
}

export function RateSelector(props: RateSelector) {
  const [rates, setRates] = useState([]);
  const [selected, setSelected] = useState<string>(null);
  const Header = useMemo(() => function Header() {
    return (
      <Box marginRight='2'>
        <Chip
          key={'##first.item.guid'}
          text={'All'}
          leftIcon={<Star set="bold" size="small" />}
          type={!selected ? "filled" : "outline"}
          disabled={!selected}
          onPress={() => setSelected(null)}
        />
      </Box>
    )
  }, [selected])

  useEffect(() => {
    Promise.all([delay(500)]).then(() => setRates(listRates))
  }, [])

  useEffect(() => {
    props.onChanged && props.onChanged(selected)
  }, [selected])


  const renderItem = ({ index, item: { key } }) => {
    return (
      <Chip
        key={key}
        text={`${key}`}
        leftIcon={<Star set="bold" size="small" />}
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
      ItemSeparatorComponent={() => <Box width="2" />}
      ListEmptyComponent={<Center>
        <EduBody tx="emptyStateComponent.generic.heading" />
      </Center>}
      showsHorizontalScrollIndicator={false}
    />
  )
}
