import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo, useState } from "react"
import {
  AccessibilityProps,
  FlatList,
  Platform,
  ViewStyle,
} from "react-native"
import { XStack } from "tamagui"
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
      <Chip
        marginRight="$2"
        key={"##first.item.guid"}
        text={"🔥 All"}
        // leftIcon={<Star set="bold" color={!selected ? "white" : colors.primary[500]} />}
        type={!selected ? "filled" : "outline"}
        disabled={!selected}
        onPress={() => setSelected(null)}
        {...Platform.select<AccessibilityProps>({
          ios: { accessibilityLabel: "All" },
          android: { accessibilityLabel: "All" }
        })}
      />
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
      ItemSeparatorComponent={() => <XStack width="$2" />}
      ListEmptyComponent={<EduBody tx="emptyStateComponent.generic.heading" alignSelf="center" />}
      showsHorizontalScrollIndicator={false}
    />
  )
})

const $contentContainerStyle: ViewStyle = { paddingHorizontal: 24 }

