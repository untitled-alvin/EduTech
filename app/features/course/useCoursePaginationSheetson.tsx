import { useEffect, useState } from 'react'
import { api, Course } from '../../services/student-api'
import { SearchCourseParams } from '../../services/student-api/source'

export const useCoursePagination = () => {
  const [skip, setSkip] = useState(0)
  const [limit] = useState(10)
  const [isEnd, setIsEnd] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [category, setCategory] = useState(undefined)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // console.log(category)
  }, [category])

  const fetch = async (params: SearchCourseParams) => {
    const response = await api.course.search(params)

    if (response.kind === "ok") {
      const { hasNextPage } = response.data
      const results: Course[] = response.data.results.map((e) => (e as Course))

      if (params.skip > 0) {
        setCourses([...courses, ...results])
      } else {
        setCourses(results)
      }

      setSkip(params.skip)
      setIsEnd(!hasNextPage)
    } else {
      console.tron.error(`Error fetching courses: ${JSON.stringify(response)}`, [])
    }

    return response
  }

  const initialLoad = async () => {
    setIsLoading(true)
    await fetch({ limit, skip: 0, category })
    setIsLoading(false)
  }

  const manualRefresh = async () => {
    if (!refreshing && !isLoading && !isLoadMore) {
      setRefreshing(true)
      await fetch({ limit, skip: 0, category })
      setRefreshing(false)
    }
  }

  const loadMore = async () => {
    if (!refreshing && !isLoading && !isLoadMore && !isEnd) {
      setIsLoadMore(true)
      await fetch({ limit, skip: skip + limit, category })
      setIsLoadMore(false)
    }
  }

  const categoryChanged = async (value: string) => {
    setIsEnd(false)
    setCourses([])
    setSkip(0)
    setCategory(value)

    setIsLoading(true)
    await fetch({ limit, skip: 0, category: value })
    setIsLoading(false)
  }

  return {
    limit,
    skip,
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