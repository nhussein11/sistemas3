import axios, { AxiosRequestConfig } from 'axios'

const axiosConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
}
const publicAxiosInstance = axios.create(axiosConfig)

export default publicAxiosInstance
