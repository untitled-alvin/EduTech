import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo, useState } from "react"
import {
  AccessibilityProps,
  FlatList,
  Platform,
  ViewStyle,
} from "react-native"
import { XStack } from "tamagui"
import { Chip, Body } from "../../../components"
import { useStores } from "../../../models"
import { Category } from "../models"

interface CategorySelectProps {
  picked?: Category
  onChanged?: (value?: Category) => void
}

export const CategorySelect = observer((props: CategorySelectProps) => {
  const { categoryStore } = useStores()
  const [selected, setSelected] = useState<Category>(null);

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    props.onChanged && props.onChanged(selected)
  }, [selected])

  const Header = useMemo(() => () => {
    return (
      <Chip
        mr="$2"
        text={"🔥 All"}
        preset={!selected ? "filled" : "outline"}
        disabled={!selected}
        onPress={() => setSelected(null)}
        {...Platform.select<AccessibilityProps>({
          ios: { accessibilityLabel: "All" },
          android: { accessibilityLabel: "All" }
        })}
      />
    )
  }, [selected])

  const renderItem = ({ item }) => (
    <Chip
      key={item.value}
      text={`💰 ${item.label}`}
      preset={item === selected ? "filled" : "outline"}
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
      ItemSeparatorComponent={() => <XStack w="$2" />}
      ListEmptyComponent={<Body tx="emptyStateComponent.generic.heading" als="center" />}
      showsHorizontalScrollIndicator={false}
    />
  )
})

const $contentContainerStyle: ViewStyle = { paddingHorizontal: 24 }

