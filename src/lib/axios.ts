import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlZG5hIiwic3ViIjoiNzY5YWY1YzktZDgzMy00MDRkLTgwYTMtYmRjODY0M2QxN2MzIiwiZXhwIjoxNzQ3MTM0MTk4LCJpYXQiOjE3NDcwOTgxOTh9.f9Ik8zf2I1q8JBf170AgwOaQMz3RBupszlvQ0AENyJg13X-YsHLI4buBZGS2CphNgdoXuM4dibqSo4OCBgSarI_h1I2VmsUy_shQLbZ7ghSXmn3X3bHPTNqcocPHNq7NxkxecZ5FHEqCSGsT43uPKV5dYsvUyCgfsYjJpIWFTzOk-TmJiHjVZGiCzQyWRZKBZwQGRjW9xQK6DErMitC5fVWiXaQ0fOmEoTTk01vymYRtAnBm36bN2fy5SE3ymzKV6exaYPQYN5LIWFeBgbq305LlOiB-F6nwRXOjXQoGG-YKv73NK0CTDdZGEvUqTCZbqD3Y1dtIZ170S_5zX6u1IQ`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
