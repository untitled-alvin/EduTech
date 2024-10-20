import React, { useCallback, useEffect, useState } from 'react'
import { Mentor, UserModel } from './models/Mentor'
import { api } from '../../services/api'

export const useMentorPagination = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mentors, setMentors] = useState<Mentor[]>([])

  useEffect(() => {
    fetchMentors()
  }, [])

  const fetchMentors = useCallback(async () => {
    const response = await api.getEpisodes()
    if (response.kind === "ok") {
      setMentors(response.episodes.map((e) => UserModel.create(e)))
    } else {
      console.tron.error(`Error fetching mentors: ${JSON.stringify(response)}`, [])
    }
  }, [])


  return [
    { isRefreshing, isLoading, mentors },
    { fetchMentors },
  ] as const
}
