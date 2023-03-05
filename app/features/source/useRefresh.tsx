import React from 'react'

export const useRefresh = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isRefreshing) {
        setIsRefreshing(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [isRefreshing])

  return [
    isRefreshing,
    () => {
      setIsRefreshing(true)
    },
  ] as const
}
