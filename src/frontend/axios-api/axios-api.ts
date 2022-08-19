import axios, { AxiosRequestConfig } from 'axios'
import { EnvService } from '../../shared/services/env.service'

const axiosConfig: AxiosRequestConfig = {
  baseURL: (EnvService.isProd()) ? 'https://sistemas3.vercel.app/' : 'http://localhost:3000/api',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
}

const publicAxiosInstance = axios.create(axiosConfig)

export default publicAxiosInstance
