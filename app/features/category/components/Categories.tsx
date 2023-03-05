import { observer } from "mobx-react-lite"
import { Box, Image, FlatList as FlatListNB, Text, IBoxProps, Center } from "native-base"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import {
  AccessibilityProps,
  FlatList,
  Platform,
  ViewStyle,
} from "react-native"
import { Chip, EduBody } from "../../../components"
import { useStores } from "../../../models"
import { Category } from "../models"

interface CategorySelectProps extends IBoxProps {
  picked?: Category
  // data: Category[]
  onChanged?: (value?: Category) => void
}

export const CategorySelect = observer(function CategorySelect(props: CategorySelectProps) {
  // export function CategorySelect(props: CategorySelectProps) {
  const { categoryStore } = useStores()
  const [selectedItem, setSelectedItem] = useState<Category>(null);
  const Header = useMemo(() => function Header() {
    return (
      <Box marginRight='2'>
        <Chip
          key={'##first.item.guid'}
          text={'🔥 All'}
          // onPress={() => setSelectedItem(item)}
          type={!selectedItem ? "filled" : "outline"}
          disabled={!selectedItem}
          onPress={() => setSelectedItem(null)}
          {...Platform.select<AccessibilityProps>({
            ios: { accessibilityLabel: 'All' },
            android: { accessibilityLabel: 'All' }
          })}
        />
      </Box>
    )
  }, [selectedItem])

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    props.onChanged && props.onChanged(selectedItem)
  }, [selectedItem])

  const categories = categoryStore.categories
  const load = async () => categoryStore.fetchCategories()
  const renderItem = ({ index, item }) => (
    <Chip
      key={item.value}
      text={`💰 ${item.label}`}
      // onPress={() => setSelectedItem(item)}
      type={item === selectedItem ? "filled" : "outline"}
      disabled={item === selectedItem}
      {...Platform.select<AccessibilityProps>({
        ios: { accessibilityLabel: item.label },
        android: { accessibilityLabel: item.label }
      })}
      onPress={() => setSelectedItem(item)}
    />
  )

  return (
    <FlatList<Category>
      data={categories}
      horizontal
      contentContainerStyle={$contentContainerStyle}
      // style={$contentContainerStyle}
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

