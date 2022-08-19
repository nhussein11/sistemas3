import axios, { AxiosRequestConfig } from 'axios'

const axiosConfig: AxiosRequestConfig = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : 'https://sistemas3.vercel.app/',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
}

const publicAxiosInstance = axios.create(axiosConfig)

export default publicAxiosInstance
