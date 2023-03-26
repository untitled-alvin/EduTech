import React from 'react'

export const useRefresh = () => {
  const [refreshing, setRefreshing] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (refreshing) {
        setRefreshing(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [refreshing])

  return [
    refreshing,
    () => {
      setRefreshing(true)
    },
  ] as const
}
