import React, { useCallback, useEffect, useState } from 'react'
import { Source, SourceModel } from './models/Source'
import { api } from '../../services/api'
import { delay } from '../../utils/delay'

export const useSourcePagination = () => {
  const [current, setCurrent] = useState(1)
  const [total, setTotal] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isEnd, setIsEnd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [category, setCategory] = useState('')
  const [sources, setSources] = useState<Source[]>([])

  useEffect(() => {
    if (current === total) {
      setIsEnd(true)
    } else {
      setIsEnd(false)
    }
  }, [current, total])

  useEffect(() => {
    // console.log(isEnd)
  }, [category])

  const init = () => {
    setCurrent(1)
    setTotal(1)
    setLimit(10)
    setIsEnd(false)
    setIsLoading(false)
    setRefreshing(false)
    setIsLoadMore(false)
    setCategory('')
    setSources([])
  }

  const fetchSources = async () => {
    const offset = (current - 1) * limit
    const response = await api.getSources({ limit: limit, offset: offset })
    console.log("offset" + offset)
    if (response.kind === "ok") {

      setTotal(response.total)
      const sourcesData = response.data.map((e) => SourceModel.create(e))

      if (current > 1) {
        setSources([...sources, ...sourcesData])
      } else {
        setSources(sourcesData)
      }
    } else {
      console.tron.error(`Error fetching sources: ${JSON.stringify(response)}`, [])
    }
  }

  const load = async () => {
    setIsLoading(true)
    await fetchSources()
    setIsLoading(false)
  }

  const loadMore = async () => {
    if (!refreshing && !isLoading && !isLoadMore && !isEnd) {
      setCurrent(current + 1)
      setIsLoadMore(true)
      await Promise.all([fetchSources(), delay(750)])
      setIsLoadMore(false)
    }
  }

  const manualRefresh = async () => {
    setRefreshing(true)
    setCurrent(1)
    await Promise.all([fetchSources(), delay(750)])
    setRefreshing(false)
  }

  const categoryChanged = async (value: string) => {
    init()
    setCategory(value)
    await load()
  }

  return [
    {
      current,
      total,
      limit,
      isEnd,
      isLoading,
      refreshing,
      isLoadMore,
      sources
    },
    { load, loadMore, manualRefresh, categoryChanged },
  ] as const
}

// const next = useCallback(async () => {
//   const offset = (current - 1) * limit
//   const response = await api.getSources({ limit: limit, offset: offset })
//   if (response.kind === "ok") {
//     const sourcesData = response.data.map((e) => SourceModel.create(e))
//     setTotal(response.total)

//     if (current > 1) {
//       setSources([...sources, ...sourcesData])
//     } else {
//       setSources(sourcesData)
//     }
//   } else {
//     console.tron.error(`Error fetching sources: ${JSON.stringify(response)}`, [])
//   }
// }, [])
