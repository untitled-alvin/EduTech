import { useEffect, useState } from 'react'
import { CourseModel, Course } from './models/Course'
import { sheetsonApi } from '../../services/sheetson'

export const useCoursePagination = () => {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [isEnd, setIsEnd] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [category, setCategory] = useState(undefined)
  const [courses, setCourses] = useState<Course[]>([])

  // useEffect(() => {
  //   setIsEnd(offset === total)
  // }, [offset, total])

  useEffect(() => { }, [category])

  const initial = () => {
    setOffset(0)
    setLimit(10)
    setIsEnd(false)
    setIsLoading(false)
    setRefreshing(false)
    setIsLoadMore(false)
    setCategory('')
    setCourses([])
  }

  const fetch = async ({ offset }: { offset: number }) => {
    const response = await sheetsonApi.courseSheet.search({ limit: limit, skip: offset })

    if (response.kind === "ok") {
      setOffset(offset)

      const coursesData = response.data.results?.map(({
        original_price, promotion_price, certificate, ...rest
      }) => CourseModel.create({
        ...rest,
        id: rest.rowIndex.toString(),
        original_price: +original_price,
        promotion_price: +promotion_price,
        certificate: certificate === "TRUE" ? true : false
      }))

      if (offset > 0) {
        setIsEnd(!response.data.hasNextPage)
        setCourses([...courses, ...coursesData])
      } else {
        setIsEnd(!response.data.hasNextPage)
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