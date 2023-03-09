import { observer } from "mobx-react-lite"
import { Box, Center } from "native-base"
import React, { useEffect, useMemo, useState } from "react"
import {
  AccessibilityProps,
  FlatList,
  Platform,
  ViewStyle,
} from "react-native"
import { Chip, EduBody } from "../../../components"
import { useStores } from "../../../models"
import { Category } from "../models"

interface CategorySelectProps {
  picked?: Category
  onChanged?: (value?: Category) => void
}

export const CategorySelect = observer(function CategorySelect(props: CategorySelectProps) {
  const { categoryStore } = useStores()
  const [selected, setSelected] = useState<Category>(null);

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    props.onChanged && props.onChanged(selected)
  }, [selected])

  const Header = useMemo(() => function Header() {
    return (
      <Box marginRight='2'>
        <Chip
          key={'##first.item.guid'}
          text={'🔥 All'}
          type={!selected ? "filled" : "outline"}
          disabled={!selected}
          onPress={() => setSelected(null)}
          {...Platform.select<AccessibilityProps>({
            ios: { accessibilityLabel: 'All' },
            android: { accessibilityLabel: 'All' }
          })}
        />
      </Box>
    )
  }, [selected])

  const renderItem = ({ index, item }) => (
    <Chip
      key={item.value}
      text={`💰 ${item.label}`}
      type={item === selected ? "filled" : "outline"}
      disabled={item === selected}
      {...Platform.select<AccessibilityProps>({
        ios: { accessibilityLabel: item.label },
        android: { accessibilityLabel: item.label }
      })}
      onPress={() => setSelected(item)}
    />
  )

  const load = async () => categoryStore.fetchCategories()

  return (
    <FlatList<Category>
      data={categoryStore.categories}
      horizontal
      contentContainerStyle={$contentContainerStyle}
      ListHeaderComponent={<Header />}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Box width="2" />}
      ListEmptyComponent={<Center>
        <EduBody tx="emptyStateComponent.generic.heading" />
      </Center>}
      showsHorizontalScrollIndicator={false}
    />
  )
})

const $contentContainerStyle: ViewStyle = {
  paddingHorizontal: 24,
}

