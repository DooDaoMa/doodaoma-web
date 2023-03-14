import axios from 'axios'

const baseURL =
  process.env.REACT_APP_ORIGIN || 'https://doodaoma-server-dev.up.railway.app/'

const axiosAccountAPI = axios.create({
  baseURL: `${baseURL}`,
  withCredentials: true,
})

const axiosAuthAPI = axios.create({
  baseURL: `${baseURL}`,
  withCredentials: true,
})

const axiosContentAPI = axios.create({
  baseURL: `${baseURL}api`,
})

export { axiosAccountAPI, axiosAuthAPI, axiosContentAPI }
