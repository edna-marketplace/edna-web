import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlZG5hIiwic3ViIjoiNzY5YWY1YzktZDgzMy00MDRkLTgwYTMtYmRjODY0M2QxN2MzIiwiZXhwIjoxNzQ3MDEwNDcyLCJpYXQiOjE3NDY5NzQ0NzJ9.ydjr6Ivs4ZlHyX5_y7bF-VPIbASqB-byiv26zLoxy4oK1TynUsjcLk_yqVKRqRpnqtWkbqmzL8EZGt4PWNAn0FsxH0HFX-cTZcLZyRht7IHD8r5UT1ovC8GIWRxhqjeYNO3WTvh1ZW0IOuMScEetwKtfvk4gtuDaK8kNN2wZ2nMRVT330jKxfJa2sit-xfeGChAdXYRWXrAP_hK7qhjFVy7VXNZb9PUK22zAzbdpMmDDk_Nlu3hSdvC8DkXSj7ukwPRyYekmig3rdMFwTmZQexbpLIanyOV4BKHTodnSTDHzeKcffw6ntDMP_pZhtlwFraXfro_ea45KFxjjOfp-lg`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
