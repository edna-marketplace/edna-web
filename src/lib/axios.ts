import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlZG5hIiwic3ViIjoiNDkwZjgyOTQtNWQzZi00NDQwLWFiNDctYWNlNGRjY2M5OTY1IiwiZXhwIjoxNzQ1ODQ4MDYyLCJpYXQiOjE3NDU4MTIwNjJ9.vOiQdYs1DIjCqKdCOAgNDZGAK1aYNQeTtrZm_WY7NQwNKrTZpoUXkPqbJL34GGAIE8QP8_Xc0h1fkWE5AQCjeNbvzKD_vCJgh14rJBJnK45F-TCL9DduebUP4GJSISKVgRVYO6gkhy9oXM50QC3othqwfWxJbvG7r_iy255gnrPdCyJWxGiJ5RKP35OXzya6L6WAstkgBKB7dWdKP7C29QLUf1mfEeFfapelg0w-3KUudZIj_qOHGbA2Y5s5sBnQHV-fSHM7pYa10ge5fK-djJ5a3QmkaZCifqNSp121l65FVB3ioX9VOocJuOTuTJAd0NNogL7dR04DxHDkWAG1eQ`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
