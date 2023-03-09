import { useEffect, useState } from 'react'
import { Source, SourceModel } from './models/Source'
import { api } from '../../services/api'
import { delay } from '../../utils/delay'

export const useSourcePagination = () => {
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isEnd, setIsEnd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [category, setCategory] = useState('')
  const [sources, setSources] = useState<Source[]>([])

  useEffect(() => {
    setIsEnd(offset === total)
  }, [offset, total])

  useEffect(() => {
  }, [category])

  const initial = () => {
    setOffset(0)
    setTotal(1)
    setLimit(10)
    setIsEnd(false)
    setIsLoading(false)
    setRefreshing(false)
    setIsLoadMore(false)
    setCategory('')
    setSources([])
  }

  const fetch = async ({ offset }: { offset: number }) => {
    const response = await api.getSources({ limit: limit, offset: offset })

    if (response.kind === "ok") {
      setTotal(response.total)
      setOffset(offset)

      const sourcesData = response.data.map((e) => SourceModel.create(e))

      if (offset > 0) {
        setSources([...sources, ...sourcesData])
      } else {
        setSources(sourcesData)
      }
    } else {
      console.tron.error(`Error fetching sources: ${JSON.stringify(response)}`, [])
    }
  }

  const initialLoad = async () => {
    setIsLoading(true)
    await fetch({ offset: 0 })
    setIsLoading(false)
  }

  const loadMore = async () => {
    if (!refreshing && !isLoading && !isLoadMore && !isEnd) {
      setIsLoadMore(true)
      await Promise.all([fetch({ offset: offset + limit })])
      setIsLoadMore(false)
    }
  }

  const manualRefresh = async () => {
    if (!refreshing && !isLoading && !isLoadMore) {
      setRefreshing(true)
      await Promise.all([fetch({ offset: 0 })])
      setRefreshing(false)
    }
  }

  const categoryChanged = async (value: string) => {
    initial()
    setCategory(value)
    await initialLoad()
  }

  return [
    {
      offset,
      total,
      limit,
      isEnd,
      isLoading,
      refreshing,
      isLoadMore,
      sources
    },
    { initialLoad, loadMore, manualRefresh, categoryChanged },
  ] as const
}