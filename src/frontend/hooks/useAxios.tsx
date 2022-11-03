import { useState, useEffect } from 'react'
import publicAxiosInstance from '../api/axios-api'

interface IUseAxiosWithAbortResponse {
  fetchedData: any
  isLoading: boolean
  error: Error | null
}

export const useAxios = (
  endpoint: string
): IUseAxiosWithAbortResponse => {
  const [fetchedData, setFetchedData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        const response = await publicAxiosInstance(endpoint, {
          signal: abortController.signal
        })
        console.log(response.data)

        setIsLoading(false)
        setFetchedData(response.data.data)
      } catch (error) {
        // @ts-ignore
        if (error.name === 'AbortError') {
          // @ts-ignore
          setError(error)
          setIsLoading(false)
        }
      }
    }
    fetchData()
    return () => {
      abortController.abort()
    }
  }, [endpoint])

  return { fetchedData, isLoading, error }
}
