import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { Course, CourseModel } from '../../services/edu-api'


export const useCoursePagination = () => {
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isEnd, setIsEnd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [category, setCategory] = useState(undefined)
  const [courses, setCourses] = useState<Course[]>([])

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
    setCourses([])
  }

  const fetch = async ({ offset }: { offset: number }) => {
    const response = await api.getCourses({ limit: limit, offset: offset })

    if (response.kind === "ok") {
      setTotal(response.total)
      setOffset(offset)

      const coursesData = response.data.map((e) => CourseModel.create(e))

      if (offset > 0) {
        setCourses([...courses, ...coursesData])
      } else {
        setCourses(coursesData)
      }
    } else {
      console.tron.error(`Error fetching courses: ${JSON.stringify(response)}`, [])
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

  return {
    offset,
    total,
    limit,
    isEnd,
    isLoading,
    refreshing,
    isLoadMore,
    courses,
    initialLoad,
    loadMore,
    manualRefresh,
    categoryChanged
  } as const
}