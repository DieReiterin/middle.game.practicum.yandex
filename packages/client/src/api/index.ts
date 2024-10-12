import axios from 'axios'
import { baseURL } from './constants'

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const api = axios.create({
  baseURL,
  method: Methods.GET,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export default api
