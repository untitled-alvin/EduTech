import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo, useState } from "react"
import {
  FlatList,
  Platform,
  ViewStyle,
  AccessibilityProps,
} from "react-native"
import { XStack } from "tamagui"
import { Chip, Body } from "../../../components"
import { useStores } from "../../../models"
import { Category } from "../models"
import { translate } from "../../../i18n"

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

  const Header = useMemo(() => () => (
    <Chip
      mr="$2"
      text={`🔥 ${translate("common.all")}`}
      preset={!selected ? "filled" : "outline"}
      disabled={!selected}
      onPress={() => setSelected(null)}
      {...Platform.select<AccessibilityProps>({
        ios: { accessibilityLabel: "All" },
        android: { accessibilityLabel: "All" }
      })}
    />
  ), [selected])

  const ListEmptyComponent = useMemo(() => () => (
    <Body als="center" tx="emptyStateComponent.generic.heading" />
  ), [])


  const renderItem = ({ item }: { item: Category }) => {
    const label = item.label ?? ""
    const ic = item.ic ? `${item.ic} ` : ""

    return (
      <Chip
        key={item.value}
        text={`${ic}${label}`}
        preset={item === selected ? "filled" : "outline"}
        disabled={item === selected}
        {...Platform.select<AccessibilityProps>({
          ios: { accessibilityLabel: label },
          android: { accessibilityLabel: label }
        })}
        onPress={() => setSelected(item)}
      />
    )
  }

  const load = async () => categoryStore.fetchCategories()

  return (
    <FlatList<Category>
      data={categoryStore.categories}
      horizontal
      contentContainerStyle={$contentContainerStyle}
      ListHeaderComponent={<Header />}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <XStack w="$2" />}
      ListEmptyComponent={<ListEmptyComponent />}
      showsHorizontalScrollIndicator={false}
    />
  )
})

const $contentContainerStyle: ViewStyle = { paddingHorizontal: 24 }

