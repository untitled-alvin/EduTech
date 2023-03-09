import { useEffect, useState } from 'react'
import { Student, StudentModel } from './models/Student'
import { api } from '../../services/api'
import { delay } from '../../utils/delay'

export const useStudentPagination = () => {
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isEnd, setIsEnd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    setIsEnd(offset === total)
  }, [offset, total])

  const initial = () => {
    setOffset(0)
    setTotal(1)
    setLimit(10)
    setIsEnd(false)
    setIsLoading(false)
    setRefreshing(false)
    setIsLoadMore(false)
    setStudents([])
  }

  const fetch = async () => {
    const response = await api.getEpisodes()
    if (response.kind === "ok") {
      setStudents(response.episodes.map((e) => StudentModel.create(e)))
    } else {
      console.tron.error(`Error fetching mentors: ${JSON.stringify(response)}`, [])
    }
  }

  const initialLoad = async () => {
    setIsLoading(true)
    await fetch()
    setIsLoading(false)
  }

  const loadMore = async () => {
    if (!refreshing && !isLoading && !isLoadMore && !isEnd) {
      setIsLoadMore(true)
      await Promise.all([fetch()])
      setIsLoadMore(false)
    }
  }

  const manualRefresh = async () => {
    setRefreshing(true)
    await Promise.all([fetch()])
    setRefreshing(false)
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
      students
    },
    { initialLoad, loadMore, manualRefresh },
  ] as const

}
